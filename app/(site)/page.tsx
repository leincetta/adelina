import Link from "next/link";
import { MediaFrame } from "@/components/MediaFrame";
import { FlavorCard } from "@/components/FlavorCard";
import { Reveal } from "@/components/Reveal";
import { getFeaturedFlavors, getSiteSettings } from "@/lib/sanity/queries";

export default async function HomePage() {
  const [story, featuredFlavors] = await Promise.all([
    getSiteSettings(),
    getFeaturedFlavors(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
        <MediaFrame
          src={story.heroImageUrl}
          alt="Adelina gelato, Brooklyn"
          tone="cherry"
          label="Hero — night-flash photo of gelato being spooned and shared"
          priority
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-ink/40" />

        <div className="relative h-full flex flex-col justify-end px-5 sm:px-8 pb-16 sm:pb-24 max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-[0.4em] text-bone-dim animate-fade-in">
            Small-batch gelato — Brooklyn
          </p>
          <h1 className="mt-5 max-w-4xl text-balance font-medium uppercase leading-[0.95] text-[13vw] sm:text-6xl md:text-7xl lg:text-8xl animate-fade-up">
            {story.homepageTagline}
          </h1>
          {story.homepageSubline && (
            <p
              className="mt-6 max-w-md text-base sm:text-lg text-bone-dim animate-fade-up"
              style={{ animationDelay: "150ms" }}
            >
              {story.homepageSubline}
            </p>
          )}

          <div
            className="mt-10 flex flex-wrap items-center gap-4 animate-fade-up"
            style={{ animationDelay: "300ms" }}
          >
            <Link
              href="/book"
              className="text-xs uppercase tracking-[0.25em] bg-bone text-ink px-7 py-4 hover:bg-cherry hover:text-bone transition-colors"
            >
              Book an event
            </Link>
            <Link
              href="/flavors"
              className="text-xs uppercase tracking-[0.25em] border border-bone/40 px-7 py-4 hover:border-bone transition-colors"
            >
              See the flavors
            </Link>
          </div>
        </div>

        <div className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-bone-dim/70">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <span className="h-10 w-px bg-bone-dim/40" />
        </div>
      </section>

      {/* Story teaser */}
      <section className="relative py-24 sm:py-32 px-5 sm:px-8">
        <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          <Reveal>
            <MediaFrame
              src={story.storyImageUrl}
              alt={story.chefName}
              tone="fig"
              label="Chef Leandro Incetta at work"
              className="aspect-[4/5] w-full"
            />
          </Reveal>
          <Reveal delay={150}>
            <p className="text-xs uppercase tracking-[0.35em] text-bone-dim">
              The story
            </p>
            <p className="mt-6 text-2xl sm:text-3xl md:text-4xl leading-tight text-balance">
              {story.storyIntro ?? story.storyBody[0]}
            </p>
            <Link
              href="/story"
              className="mt-8 inline-block text-xs uppercase tracking-[0.25em] border-b border-bone/40 pb-1 hover:border-bone transition-colors"
            >
              Read the full story
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Flavor teaser */}
      <section className="relative py-24 sm:py-32 px-5 sm:px-8 bg-ink-soft">
        <div className="mx-auto max-w-7xl">
          <Reveal className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-bone-dim">
                Currently scooping
              </p>
              <h2 className="mt-3 text-4xl sm:text-5xl uppercase leading-none">
                Flavors
              </h2>
            </div>
            <Link
              href="/flavors"
              className="text-xs uppercase tracking-[0.25em] border-b border-bone/40 pb-1 hover:border-bone transition-colors"
            >
              View all
            </Link>
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {featuredFlavors.map((flavor, i) => (
              <Reveal key={flavor._id} delay={i * 80}>
                <FlavorCard flavor={flavor} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 sm:py-40 px-5 sm:px-8 overflow-hidden">
        <MediaFrame
          alt=""
          tone="caramel"
          label="Night-flash photo of a party sharing gelato"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-ink/70" />
        <Reveal className="relative mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-4xl sm:text-5xl md:text-6xl uppercase leading-[1.05]">
            {story.ctaHeading}
          </h2>
          <p className="mt-6 text-bone-dim max-w-xl mx-auto">
            Private dinners, parties, weddings, brand moments — Adelina travels.
            Tell us the date and the crowd, and we&apos;ll build the flavor list.
          </p>
          <Link
            href="/book"
            className="mt-10 inline-block text-xs uppercase tracking-[0.25em] bg-bone text-ink px-8 py-4 hover:bg-cherry hover:text-bone transition-colors"
          >
            Start your inquiry
          </Link>
        </Reveal>
      </section>
    </>
  );
}
