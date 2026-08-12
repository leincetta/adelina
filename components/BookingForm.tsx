"use client";

import { useState } from "react";
import { bookingSchema, type BookingFieldErrors } from "@/lib/booking-schema";
import { MediaFrame } from "@/components/MediaFrame";
import { SignupForm } from "@/components/SignupForm";
import { toneForFlavor } from "@/lib/flavor-tone";
import type { Flavor } from "@/lib/types";

type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full bg-transparent border-b border-bone/25 py-3 text-bone placeholder:text-bone-dim/50 focus:outline-none focus:border-bone transition-colors [color-scheme:dark]";
const labelClasses = "text-xs uppercase tracking-[0.2em] text-bone-dim";

interface BookingFormProps {
  flavors: Flavor[];
}

export function BookingForm({ flavors }: BookingFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<BookingFieldErrors>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);

  function toggleFlavor(name: string) {
    setSelectedFlavors((prev) =>
      prev.includes(name) ? prev.filter((f) => f !== name) : [...prev, name]
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      ...Object.fromEntries(formData.entries()),
      selectedFlavors,
    };

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

        <div className="mt-10 pt-10 border-t border-bone/10 max-w-sm mx-auto">
          <p className="text-sm text-bone-dim">
            Want first dibs on the next flavor drop?
          </p>
          <SignupForm className="mt-4" />
        </div>
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
      </div>

      <fieldset>
        <legend className={labelClasses}>
          Pick your flavors {selectedFlavors.length > 0 && `(${selectedFlavors.length} selected)`}
        </legend>
        <p className="mt-2 text-sm text-bone-dim">
          Tap any that catch your eye — no strong preference is fine too.
        </p>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {flavors.map((flavor) => {
            const selected = selectedFlavors.includes(flavor.name);
            return (
              <button
                key={flavor._id}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleFlavor(flavor.name)}
                className={`group text-left focus:outline-none ${
                  selected ? "" : "opacity-90 hover:opacity-100"
                }`}
              >
                <div
                  className={`relative rounded-sm ring-1 transition-all ${
                    selected
                      ? "ring-2 ring-cherry"
                      : "ring-bone/15 group-hover:ring-bone/40"
                  }`}
                >
                  <MediaFrame
                    src={flavor.heroImageUrl}
                    alt={flavor.name}
                    tone={toneForFlavor(flavor.slug)}
                    className="aspect-square"
                    sizes="(min-width: 640px) 20vw, 33vw"
                  />
                  <div
                    className={`absolute top-2 right-2 h-6 w-6 rounded-full border flex items-center justify-center transition-colors ${
                      selected
                        ? "bg-cherry border-cherry"
                        : "bg-ink/60 border-bone/40"
                    }`}
                  >
                    {selected && (
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      >
                        <path
                          d="M3 8.5L6.2 11.5L13 4.5"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-bone"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <p className="mt-2 text-xs uppercase tracking-[0.1em] text-bone">
                  {flavor.name}
                </p>
              </button>
            );
          })}
        </div>

        {errors.selectedFlavors?.[0] && (
          <p className="mt-2 text-xs text-cherry">{errors.selectedFlavors[0]}</p>
        )}
      </fieldset>

      <Field
        label="Something custom in mind?"
        error={errors.customFlavorRequest?.[0]}
      >
        <textarea
          name="customFlavorRequest"
          rows={2}
          placeholder="Have a flavor idea of your own? Tell us about it."
          className={inputClasses}
        />
      </Field>

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
