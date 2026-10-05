"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function EnquiryForm() {
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (pending) return;

    setError("");

    const form = event.currentTarget;
    const payload = Object.fromEntries(
      new FormData(form).entries(),
    );

    setPending(true);

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.error ??
            "Your enquiry could not be saved. Please try again or call us.",
        );
      }

      setSent(true);
      form.reset();
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Your enquiry could not be saved. Please try again or call us.",
      );
    } finally {
      setPending(false);
    }
  }

  if (sent) {
    return (
      <div
        className="border-t border-border py-8"
        role="status"
      >
        <Check className="mb-4 size-7 text-primary" />

        <h3 className="font-display text-3xl">
          Thank you for reaching out.
        </h3>

        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          Your enquiry has been received. For an immediate
          conversation, call{" "}
          <a
            className="underline underline-offset-4 hover:text-primary"
            href="tel:3236127086"
          >
            323-612-7086
          </a>
          .
        </p>

        <Button
          variant="editorialOutline"
          className="mt-6"
          onClick={() => {
            setSent(false);
            setError("");
          }}
        >
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-5"
      aria-label="Property enquiry form"
    >
      {/* Name + Email */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="enquiry-name">
            Name{" "}
            <span className="text-primary">*</span>
          </Label>

          <Input
            id="enquiry-name"
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
            placeholder="Your name"
            className="enquiry-field h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="enquiry-email">
            Email{" "}
            <span className="text-primary">*</span>
          </Label>

          <Input
            id="enquiry-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={255}
            placeholder="you@example.com"
            className="enquiry-field h-12"
          />
        </div>
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="enquiry-phone">
          Phone{" "}
          <span className="text-xs font-normal text-muted-foreground">
            (optional)
          </span>
        </Label>

        <Input
          id="enquiry-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          maxLength={30}
          placeholder="Your number"
          className="enquiry-field h-12"
        />
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="enquiry-message">
          Your message{" "}
          <span className="text-primary">*</span>
        </Label>

        <Textarea
          id="enquiry-message"
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={5}
          placeholder="Tell us what you'd like to know, or when you'd like to visit."
          className="enquiry-field min-h-32 resize-y"
        />
      </div>

      {/* Honeypot */}
      <div
        className="absolute left-[-10000px]"
        aria-hidden="true"
      >
        <Label htmlFor="enquiry-website">
          Website
        </Label>

        <Input
          id="enquiry-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Error */}
      {error && (
        <p
          role="alert"
          className="text-sm text-destructive"
        >
          {error}
        </p>
      )}

      {/* Submit */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          * Required fields
        </p>

        <Button
          type="submit"
          variant="editorial"
          size="lg"
          disabled={pending}
          className="hover-lift min-w-40"
        >
          {pending ? (
            <>
              <LoaderCircle className="animate-spin" />
              Sending
            </>
          ) : (
            <>
              Send enquiry
              <ArrowRight />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}