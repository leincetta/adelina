import type { Metadata } from "next";
import { SignupForm } from "@/components/SignupForm";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Join the Pint Club",
  description:
    "Flavor drops, pop-up locations, and pint restocks from Adelina — every two weeks.",
};

export default function JoinPage() {
  return (
    <div className="min-h-[100svh] flex items-center pt-24 pb-16 px-5 sm:px-8">
      <div className="mx-auto max-w-md w-full text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-bone-dim">
            Adelina Pint Club
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl uppercase leading-none text-balance">
            Get the next drop first.
          </h1>
          <p className="mt-5 text-bone-dim">
            Flavor drops, pop-up locations, and pint restocks — every two
            weeks.
          </p>

          <SignupForm className="mt-8 text-left" />
        </Reveal>

        <Reveal delay={150} className="mt-16 flex items-center justify-center gap-6">
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noreferrer noopener"
            className="text-[11px] uppercase tracking-[0.2em] text-bone-dim/70 hover:text-bone-dim transition-colors"
          >
            Follow {siteConfig.instagramHandle}
          </a>
          <span className="text-bone-dim/30">·</span>
          <a
            href="/book"
            className="text-[11px] uppercase tracking-[0.2em] text-bone-dim/70 hover:text-bone-dim transition-colors"
          >
            Book an Event
          </a>
        </Reveal>
      </div>
    </div>
  );
}
