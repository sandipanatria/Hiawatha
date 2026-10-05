import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

/* =========================================================
   VALIDATION
========================================================= */

const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(100, "Name is too long."),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(255, "Email address is too long."),

  phone: z
    .string()
    .trim()
    .max(30, "Phone number is too long.")
    .refine(
      (value) =>
        !value || /^[+\d\s().-]{7,30}$/.test(value),
      "Please enter a valid phone number.",
    ),

  message: z
    .string()
    .trim()
    .min(10, "Please add a little more detail.")
    .max(2000, "Message is too long."),

  /*
   * Honeypot field.
   *
   * Real users should leave this empty.
   */
  website: z
    .string()
    .max(200)
    .optional()
    .default(""),
});

/* =========================================================
   TYPES
========================================================= */

type RateLimitEntry = {
  count: number;
  firstRequest: number;
};

/* =========================================================
   SIMPLE IN-MEMORY RATE LIMITER
========================================================= */

/*
 * Maximum:
 * 4 enquiries per IP
 * per rolling 60-minute period.
 *
 * NOTE:
 * This is suitable for a simple deployment/testing setup.
 * For a multi-server/serverless production setup, use a
 * proper external rate-limit service.
 */

const rateLimitStore = new Map<
  string,
  RateLimitEntry
>();

const RATE_LIMIT = 4;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000;

/* =========================================================
   ERROR RESPONSE
========================================================= */

function jsonError(
  message: string,
  status: number,
) {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    {
      status,
    },
  );
}

/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* =========================================================
   GET CLIENT IP
========================================================= */

async function getClientIp() {
  const requestHeaders = await headers();

  return (
    requestHeaders.get("cf-connecting-ip") ??
    requestHeaders
      .get("x-forwarded-for")
      ?.split(",")[0]
      ?.trim() ??
    requestHeaders.get("x-real-ip") ??
    "unknown"
  );
}

/* =========================================================
   RATE LIMIT CHECK
========================================================= */

function checkRateLimit(ip: string) {
  const now = Date.now();

  const existing = rateLimitStore.get(ip);

  /*
   * No previous request.
   */
  if (!existing) {
    rateLimitStore.set(ip, {
      count: 1,
      firstRequest: now,
    });

    return {
      allowed: true,
    };
  }

  /*
   * Reset the window after 60 minutes.
   */
  if (
    now - existing.firstRequest >=
    RATE_LIMIT_WINDOW
  ) {
    rateLimitStore.set(ip, {
      count: 1,
      firstRequest: now,
    });

    return {
      allowed: true,
    };
  }

  /*
   * Rate limit exceeded.
   */
  if (existing.count >= RATE_LIMIT) {
    return {
      allowed: false,
    };
  }

  /*
   * Increment request count.
   */
  existing.count += 1;

  rateLimitStore.set(ip, existing);

  return {
    allowed: true,
  };
}

/* =========================================================
   POST /api/enquiry
========================================================= */

export async function POST(request: Request) {
  try {
    /* =====================================================
       PARSE + VALIDATE REQUEST
    ===================================================== */

    const body = await request.json();

    const data = enquirySchema.parse(body);

    /* =====================================================
       HONEYPOT
       
       If a bot fills this hidden field, silently return
       success without sending an email.
    ===================================================== */

    if (data.website) {
      return NextResponse.json({
        success: true,
      });
    }

    /* =====================================================
       ENVIRONMENT VARIABLES
    ===================================================== */

    const {
      RESEND_API_KEY,
      ENQUIRY_FROM_EMAIL,
      ENQUIRY_TO_EMAIL,
    } = process.env;

    if (
      !RESEND_API_KEY ||
      !ENQUIRY_FROM_EMAIL ||
      !ENQUIRY_TO_EMAIL
    ) {
      console.error(
        "Missing enquiry environment variables.",
      );

      return jsonError(
        "Enquiries are temporarily unavailable. Please call us instead.",
        503,
      );
    }

    /* =====================================================
       NORMALIZE DATA
    ===================================================== */

    const name = data.name.trim();

    const email = data.email
      .trim()
      .toLowerCase();

    const phone =
      data.phone?.trim() || null;

    const message = data.message.trim();

    /* =====================================================
       GET CLIENT IP
    ===================================================== */

    const ip = await getClientIp();

    /* =====================================================
       RATE LIMIT
    ===================================================== */

    const rateLimit = checkRateLimit(ip);

    if (!rateLimit.allowed) {
      return jsonError(
        "Too many enquiries right now. Please call us instead.",
        429,
      );
    }

    /* =====================================================
       RESEND
    ===================================================== */

    const resend = new Resend(
      RESEND_API_KEY,
    );

    /* =====================================================
       ESCAPE DATA FOR HTML EMAIL
    ===================================================== */

    const safeName = escapeHtml(name);

    const safeEmail = escapeHtml(email);

    const safePhone = escapeHtml(
      phone ?? "Not provided",
    );

    const safeMessage = escapeHtml(
      message,
    ).replace(/\n/g, "<br />");

    /* =====================================================
       SEND EMAIL
    ===================================================== */

    const {
      data: emailData,
      error: emailError,
    } = await resend.emails.send({
      from: ENQUIRY_FROM_EMAIL,

      to: ENQUIRY_TO_EMAIL,

      /*
       * When you click Reply in your email client,
       * the reply will go directly to the visitor.
       */
      replyTo: email,

      subject: `New property enquiry — ${name}`,

      /* ===================================================
         PLAIN TEXT EMAIL
      =================================================== */

      text: `
New Property Enquiry
18334 Hiawatha

Name: ${name}
Email: ${email}
Phone: ${phone ?? "Not provided"}

Message:
${message}

This enquiry was submitted through the Hiawatha property website.
      `.trim(),

      /* ===================================================
         HTML EMAIL
      =================================================== */

      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />

            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />

            <title>
              New Property Enquiry
            </title>
          </head>

          <body
            style="
              margin: 0;
              padding: 0;
              background: #f5f5f5;
              font-family: Arial, Helvetica, sans-serif;
              color: #222222;
            "
          >
            <div
              style="
                max-width: 640px;
                margin: 40px auto;
                padding: 0 20px;
              "
            >

              <div
                style="
                  background: #ffffff;
                  border: 1px solid #e5e5e5;
                  padding: 32px;
                "
              >

                <!-- HEADER -->

                <h1
                  style="
                    margin: 0 0 8px;
                    font-size: 28px;
                    font-weight: 400;
                    color: #111111;
                  "
                >
                  New Property Enquiry
                </h1>

                <p
                  style="
                    margin: 0 0 28px;
                    color: #666666;
                    font-size: 14px;
                  "
                >
                  18334 Hiawatha ·
                  Porter Ranch, Los Angeles
                </p>

                <div
                  style="
                    height: 1px;
                    background: #e5e5e5;
                    margin-bottom: 24px;
                  "
                ></div>

                <!-- NAME -->

                <p
                  style="
                    margin: 0 0 18px;
                  "
                >
                  <strong>
                    Name
                  </strong>
                  <br />

                  ${safeName}
                </p>

                <!-- EMAIL -->

                <p
                  style="
                    margin: 0 0 18px;
                  "
                >
                  <strong>
                    Email
                  </strong>
                  <br />

                  <a
                    href="mailto:${safeEmail}"
                    style="
                      color: #111111;
                    "
                  >
                    ${safeEmail}
                  </a>
                </p>

                <!-- PHONE -->

                <p
                  style="
                    margin: 0 0 18px;
                  "
                >
                  <strong>
                    Phone
                  </strong>
                  <br />

                  ${safePhone}
                </p>

                <!-- MESSAGE -->

                <p
                  style="
                    margin: 0 0 8px;
                  "
                >
                  <strong>
                    Message
                  </strong>
                </p>

                <div
                  style="
                    background: #f7f7f7;
                    border-left: 3px solid #222222;
                    padding: 16px;
                    line-height: 1.6;
                    font-size: 14px;
                  "
                >
                  ${safeMessage}
                </div>

                <!-- FOOTER DIVIDER -->

                <div
                  style="
                    height: 1px;
                    background: #e5e5e5;
                    margin: 28px 0 20px;
                  "
                ></div>

                <p
                  style="
                    margin: 0;
                    font-size: 12px;
                    color: #888888;
                  "
                >
                  This enquiry was submitted
                  through the Hiawatha property
                  website.
                </p>

              </div>
            </div>
          </body>
        </html>
      `,
    });

    /* =====================================================
       RESEND ERROR
    ===================================================== */

    if (emailError) {
      console.error(
        "Resend email failed:",
        emailError,
      );

      return jsonError(
        "Your enquiry could not be sent. Please try again or call us.",
        502,
      );
    }

    /* =====================================================
       SUCCESS LOG
    ===================================================== */

    console.log(
      "Property enquiry submitted successfully:",
      {
        enquiryEmailId: emailData?.id,
        name,
        email,
      },
    );

    /* =====================================================
       SUCCESS RESPONSE
    ===================================================== */

    return NextResponse.json({
      success: true,
      message:
        "Your enquiry has been received.",
    });
  } catch (error) {
    /* =====================================================
       VALIDATION ERROR
    ===================================================== */

    if (error instanceof z.ZodError) {
      return jsonError(
        error.issues[0]?.message ??
          "Please check your details.",
        400,
      );
    }

    /* =====================================================
       UNKNOWN ERROR
    ===================================================== */

    console.error(
      "Enquiry API error:",
      error,
    );

    return jsonError(
      "Your enquiry could not be sent. Please try again or call us.",
      500,
    );
  }
}