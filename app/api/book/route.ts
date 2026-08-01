import { NextResponse } from "next/server";
import { Resend } from "resend";
import { bookingSchema } from "@/lib/booking-schema";

const FORMAT_LABELS: Record<string, string> = {
  gelato: "Gelato",
  sorbet: "Sorbet",
  both: "Gelato & sorbet",
};

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check the form and try again.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const { RESEND_API_KEY, BOOKING_NOTIFICATION_EMAIL, BOOKING_FROM_EMAIL } = process.env;

  if (!RESEND_API_KEY || !BOOKING_NOTIFICATION_EMAIL) {
    console.error(
      "Booking form: missing RESEND_API_KEY or BOOKING_NOTIFICATION_EMAIL env var — see .env.example."
    );
    return NextResponse.json(
      { error: "Booking inquiries aren't wired up yet — please email us directly for now." },
      { status: 500 }
    );
  }

  const data = parsed.data;
  const resend = new Resend(RESEND_API_KEY);

  const lines = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "—"}`,
    `Event date: ${data.eventDate}`,
    `Headcount: ${data.headcount}`,
    `Flavors desired: ${data.flavorCount}`,
    `Format: ${FORMAT_LABELS[data.format] ?? data.format}`,
    `Dietary restrictions: ${data.dietaryRestrictions || "—"}`,
    "",
    "Additional notes:",
    data.notes || "—",
  ];

  try {
    const { error } = await resend.emails.send({
      from: BOOKING_FROM_EMAIL || "Adelina Bookings <onboarding@resend.dev>",
      to: BOOKING_NOTIFICATION_EMAIL,
      replyTo: data.email,
      subject: `Booking inquiry — ${data.name} — ${data.eventDate}`,
      text: lines.join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "We couldn't send your inquiry. Please try again or email us directly." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("Booking send failed:", err);
    return NextResponse.json(
      { error: "We couldn't send your inquiry. Please try again or email us directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
