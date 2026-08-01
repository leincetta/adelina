import type { Metadata } from "next";
import Link from "next/link";
import { MediaFrame } from "@/components/MediaFrame";
import { Reveal } from "@/components/Reveal";
import { getSiteSettings } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Story",
  description:
    "Chef Leandro Incetta's flavor story — from Buenos Aires to Brooklyn, and how Adelina became a small-batch gelato project built for connection.",
};

export default async function StoryPage() {
  const story = await getSiteSettings();

  return (
    <div className="pt-24">
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <MediaFrame
          src={story.storyImageUrl}
          alt={story.chefName}
          tone="fig"
          label="Chef Leandro Incetta, portrait"
          priority
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />

        <div className="relative px-5 sm:px-8 pb-16 max-w-4xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.35em] text-bone-dim">
              Story
            </p>
            <h1 className="mt-4 text-4xl sm:text-6xl md:text-7xl uppercase leading-[0.95] text-balance">
              {story.storyHeading}
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="px-5 sm:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl">
          {story.storyIntro && (
            <Reveal>
              <p className="text-2xl sm:text-3xl leading-tight text-balance">
                {story.storyIntro}
              </p>
            </Reveal>
          )}

          <div className="mt-12 space-y-6">
            {story.storyBody.map((paragraph, i) => (
              <Reveal key={i} delay={i * 60}>
                <p className="text-bone-dim leading-relaxed text-lg">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <p className="mt-14 text-xs uppercase tracking-[0.3em] text-bone-dim">
              &mdash; {story.chefName}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-5 sm:px-8 pb-28 sm:pb-40">
        <Reveal className="mx-auto max-w-3xl text-center border-t border-bone/10 pt-16">
          <h2 className="text-3xl sm:text-4xl uppercase leading-tight">
            Taste it for yourself.
          </h2>
          <Link
            href="/book"
            className="mt-8 inline-block text-xs uppercase tracking-[0.25em] bg-bone text-ink px-8 py-4 hover:bg-cherry hover:text-bone transition-colors"
          >
            Book an Event
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
