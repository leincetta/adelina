import { NextResponse } from "next/server";
import { Resend } from "resend";
import { subscribeSchema } from "@/lib/subscribe-schema";
import { getSiteSettings } from "@/lib/sanity/queries";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = subscribeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Enter a valid email.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const { RESEND_API_KEY, RESEND_AUDIENCE_ID, PINT_CLUB_FROM_EMAIL } = process.env;

  if (!RESEND_API_KEY || !RESEND_AUDIENCE_ID) {
    console.error(
      "Pint Club signup: missing RESEND_API_KEY or RESEND_AUDIENCE_ID env var — see .env.example."
    );
    return NextResponse.json(
      { error: "Signups aren't wired up yet — please try again later." },
      { status: 500 }
    );
  }

  const resend = new Resend(RESEND_API_KEY);

  try {
    // Resend contact creation is idempotent by email: signing up an address
    // that's already a contact just returns the existing contact, no error.
    const { error } = await resend.contacts.create({
      email: parsed.data.email,
      segments: [{ id: RESEND_AUDIENCE_ID }],
    });

    if (error) {
      console.error("Resend contact create error:", error);
      return NextResponse.json(
        { error: "We couldn't sign you up. Please try again." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("Pint Club signup failed:", err);
    return NextResponse.json(
      { error: "We couldn't sign you up. Please try again." },
      { status: 502 }
    );
  }

  // The signup itself succeeded above — a failed welcome email shouldn't
  // make it look like signing up failed, so this is best-effort only.
  try {
    const { welcomeEmailSubject, welcomeEmailBody } = await getSiteSettings();
    await resend.emails.send({
      from: PINT_CLUB_FROM_EMAIL || "Adelina Pint Club <onboarding@resend.dev>",
      to: parsed.data.email,
      subject: welcomeEmailSubject,
      text: welcomeEmailBody,
    });
  } catch (err) {
    console.error("Pint Club welcome email failed to send:", err);
  }

  return NextResponse.json({ ok: true });
}
