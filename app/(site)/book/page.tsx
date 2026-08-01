import type { Metadata } from "next";
import { BookingForm } from "@/components/BookingForm";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Book an event",
  description:
    "Book Adelina for your next dinner, party, or private event. Tell us the date, the crowd, and the flavors — we'll take it from there.",
};

export default function BookPage() {
  return (
    <div className="pt-32 pb-28 px-5 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-bone-dim">
            Book an event
          </p>
          <h1 className="mt-3 text-5xl sm:text-6xl uppercase leading-none text-balance">
            Bring Adelina to your table.
          </h1>
          <p className="mt-6 max-w-xl text-bone-dim">
            Private dinners, parties, weddings, brand moments — tell us the
            date and the crowd, and we&apos;ll build the flavor list together.
            Prefer email? Reach us directly at{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="underline underline-offset-4 hover:text-bone"
            >
              {siteConfig.email}
            </a>
            .
          </p>
        </Reveal>

        <Reveal delay={150} className="mt-16">
          <BookingForm />
        </Reveal>
      </div>
    </div>
  );
}
