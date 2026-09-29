import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { z } from "zod";

const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(100),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(255),

  phone: z
    .string()
    .trim()
    .max(30)
    .refine(
      (value) =>
        !value || /^[+\d\s().-]{7,30}$/.test(value),
      "Please enter a valid phone number."
    ),

  message: z
    .string()
    .trim()
    .min(10, "Please add a little more detail.")
    .max(2000),

  website: z
    .string()
    .max(200)
    .optional()
    .default(""),
});

function jsonError(message: string, status: number) {
  return NextResponse.json(
    { error: message },
    { status }
  );
}

export async function POST(request: Request) {
  try {
    /* =========================================================
       VALIDATE REQUEST
    ========================================================= */

    const data = enquirySchema.parse(
      await request.json()
    );

    /* =========================================================
       HONEYPOT
    ========================================================= */

    if (data.website) {
      return NextResponse.json({
        success: true,
      });
    }

    /* =========================================================
       ENVIRONMENT VARIABLES
    ========================================================= */

    const env = process.env;

    if (
      !env.SUPABASE_URL ||
      !env.SUPABASE_SERVICE_ROLE_KEY ||
      !env.ENQUIRY_RATE_SALT
    ) {
      return jsonError(
        "Enquiries are temporarily unavailable. Please call us instead.",
        503
      );
    }

    /* =========================================================
       GET CLIENT IP
    ========================================================= */

    const h = await headers();

    const ip =
      h.get("cf-connecting-ip") ??
      h
        .get("x-forwarded-for")
        ?.split(",")[0]
        ?.trim() ??
      "unknown";

    /* =========================================================
       HASH IP FOR RATE LIMITING
    ========================================================= */

    const hashBuffer = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(
        `${env.ENQUIRY_RATE_SALT}:${ip}`
      )
    );

    const ipHash = Array.from(
      new Uint8Array(hashBuffer),
      (byte) =>
        byte.toString(16).padStart(2, "0")
    ).join("");

    /* =========================================================
       SUPABASE CLIENT
    ========================================================= */

    const supabase = createClient(
      env.SUPABASE_URL,
      env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    );

    /* =========================================================
       RATE LIMIT
       Maximum 4 enquiries per IP per hour
    ========================================================= */

    const since = new Date(
      Date.now() - 60 * 60 * 1000
    ).toISOString();

    const {
      count,
      error: countError,
    } = await supabase
      .from("property_enquiries")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("ip_hash", ipHash)
      .gte("created_at", since);

    if (countError) {
      console.error(
        "Supabase rate-limit query error:",
        countError
      );

      return jsonError(
        "Enquiries are temporarily unavailable. Please call us instead.",
        503
      );
    }

    if ((count ?? 0) >= 4) {
      return jsonError(
        "Too many enquiries right now. Please call us instead.",
        429
      );
    }

    /* =========================================================
       SAVE ENQUIRY
    ========================================================= */

    const { error } = await supabase
      .from("property_enquiries")
      .insert({
        name: data.name,
        email: data.email.trim().toLowerCase(),
        phone: data.phone || null,
        message: data.message,
        ip_hash: ipHash,
      });

    if (error) {
      console.error(
        "Supabase enquiry insert error:",
        error
      );

      return jsonError(
        "Your enquiry could not be saved. Please try again or call us.",
        500
      );
    }

    /* =========================================================
       SUCCESS
    ========================================================= */

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    /* =========================================================
       VALIDATION ERROR
    ========================================================= */

    if (error instanceof z.ZodError) {
      return jsonError(
        error.issues[0]?.message ??
          "Please check your details.",
        400
      );
    }

    /* =========================================================
       UNKNOWN ERROR
    ========================================================= */

    console.error(error);

    return jsonError(
      "Your enquiry could not be saved. Please try again or call us.",
      500
    );
  }
}