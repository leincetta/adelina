"use client";

import { useState } from "react";
import {
  bookingFormatOptions,
  bookingSchema,
  type BookingFieldErrors,
} from "@/lib/booking-schema";

type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full bg-transparent border-b border-bone/25 py-3 text-bone placeholder:text-bone-dim/50 focus:outline-none focus:border-bone transition-colors [color-scheme:dark]";
const labelClasses = "text-xs uppercase tracking-[0.2em] text-bone-dim";

export function BookingForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<BookingFieldErrors>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const parsed = bookingSchema.safeParse(payload);
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors);
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const json = await res.json();

      if (!res.ok) {
        setErrors(json.fieldErrors ?? {});
        setErrorMessage(json.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="py-16 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-bone-dim">
          Inquiry sent
        </p>
        <h2 className="mt-4 text-3xl sm:text-4xl uppercase leading-tight">
          We&apos;ll be in touch soon.
        </h2>
        <p className="mt-4 text-bone-dim max-w-md mx-auto">
          Thanks for reaching out. We read every inquiry and usually reply
          within a couple of days to talk flavors, timing, and logistics.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-10">
      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Name" error={errors.name?.[0]}>
          <input name="name" type="text" required className={inputClasses} />
        </Field>
        <Field label="Email" error={errors.email?.[0]}>
          <input name="email" type="email" required className={inputClasses} />
        </Field>
        <Field label="Phone (optional)" error={errors.phone?.[0]}>
          <input name="phone" type="tel" className={inputClasses} />
        </Field>
        <Field label="Event date" error={errors.eventDate?.[0]}>
          <input name="eventDate" type="date" required className={inputClasses} />
        </Field>
        <Field label="Headcount" error={errors.headcount?.[0]}>
          <input
            name="headcount"
            type="number"
            min={1}
            required
            className={inputClasses}
          />
        </Field>
        <Field label="Number of flavors desired" error={errors.flavorCount?.[0]}>
          <input
            name="flavorCount"
            type="number"
            min={1}
            required
            className={inputClasses}
          />
        </Field>
      </div>

      <fieldset>
        <legend className={labelClasses}>Gelato, sorbet, or both</legend>
        <div className="mt-4 flex flex-wrap gap-6">
          {bookingFormatOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2.5 text-sm cursor-pointer"
            >
              <input
                type="radio"
                name="format"
                value={option.value}
                required
                className="accent-cherry h-4 w-4"
              />
              {option.label}
            </label>
          ))}
        </div>
        {errors.format?.[0] && (
          <p className="mt-2 text-xs text-cherry">{errors.format[0]}</p>
        )}
      </fieldset>

      <Field
        label="Dietary restrictions"
        error={errors.dietaryRestrictions?.[0]}
      >
        <textarea
          name="dietaryRestrictions"
          rows={3}
          placeholder="Nut allergies, dairy-free guests, etc."
          className={inputClasses}
        />
      </Field>

      <Field label="Additional notes" error={errors.notes?.[0]}>
        <textarea
          name="notes"
          rows={4}
          placeholder="Tell us about the event — venue, vibe, anything we should know."
          className={inputClasses}
        />
      </Field>

      {errorMessage && (
        <p className="text-sm text-cherry" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="text-xs uppercase tracking-[0.25em] bg-bone text-ink px-8 py-4 hover:bg-cherry hover:text-bone transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending…" : "Send inquiry"}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className={labelClasses}>{label}</span>
      <div className="mt-2">{children}</div>
      {error && <p className="mt-1.5 text-xs text-cherry">{error}</p>}
    </label>
  );
}
