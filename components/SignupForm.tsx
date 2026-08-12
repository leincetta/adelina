"use client";

import Link from "next/link";
import { useState } from "react";
import { subscribeSchema } from "@/lib/subscribe-schema";

type Status = "idle" | "submitting" | "success" | "error";

interface SignupFormProps {
  /** "inline" renders a working email form. "link" renders just a label pointing to /join — for tight spaces like the footer. */
  variant?: "inline" | "link";
  className?: string;
}

export function SignupForm({ variant = "inline", className = "" }: SignupFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const parsed = subscribeSchema.safeParse(payload);
    if (!parsed.success) {
      setError(parsed.error.flatten().fieldErrors.email?.[0] ?? "Enter a valid email.");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (variant === "link") {
    return (
      <Link
        href="/join"
        className={`text-xs uppercase tracking-[0.2em] text-bone-dim hover:text-bone transition-colors ${className}`}
      >
        Join the Pint Club
      </Link>
    );
  }

  if (status === "success") {
    return (
      <p className={`text-sm text-bone-dim ${className}`}>
        You&apos;re on the list — see you at the next drop.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`flex flex-col sm:flex-row sm:items-start gap-3 ${className}`}
    >
      <div className="flex-1 min-w-0">
        <input
          name="email"
          type="email"
          required
          placeholder="you@email.com"
          aria-label="Email address"
          className="w-full bg-transparent border-b border-bone/25 py-3 text-bone placeholder:text-bone-dim/50 focus:outline-none focus:border-bone transition-colors [color-scheme:dark]"
        />
        {error && (
          <p className="mt-1.5 text-xs text-cherry" role="alert">
            {error}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="shrink-0 text-xs uppercase tracking-[0.25em] bg-bone text-ink px-6 py-3 hover:bg-cherry hover:text-bone transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Joining…" : "Join"}
      </button>
    </form>
  );
}
