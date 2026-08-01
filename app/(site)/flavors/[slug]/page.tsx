import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MediaFrame } from "@/components/MediaFrame";
import { FlavorCard } from "@/components/FlavorCard";
import { Reveal } from "@/components/Reveal";
import { toneForFlavor } from "@/lib/flavor-tone";
import {
  getAllFlavors,
  getAllFlavorSlugs,
  getFlavorBySlug,
} from "@/lib/sanity/queries";

interface FlavorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllFlavorSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: FlavorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const flavor = await getFlavorBySlug(slug);
  if (!flavor) return {};

  return {
    title: flavor.name,
    description: flavor.shortDescription,
    openGraph: {
      title: `${flavor.name} — Adelina`,
      description: flavor.shortDescription,
      images: flavor.heroImageUrl ? [{ url: flavor.heroImageUrl }] : undefined,
    },
  };
}

export default async function FlavorDetailPage({ params }: FlavorPageProps) {
  const { slug } = await params;
  const [flavor, allFlavors] = await Promise.all([
    getFlavorBySlug(slug),
    getAllFlavors(),
  ]);

  if (!flavor) notFound();

  const more = allFlavors.filter((f) => f.slug !== flavor.slug).slice(0, 4);

  return (
    <div className="pt-24">
      <section className="relative grid lg:grid-cols-2 min-h-[70vh]">
        <MediaFrame
          src={flavor.heroImageUrl}
          alt={flavor.name}
          tone={toneForFlavor(flavor.slug)}
          label={`${flavor.name} — hero`}
          priority
          className="min-h-[45vh] lg:min-h-full"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />

        <div className="flex flex-col justify-center px-5 sm:px-8 lg:px-16 py-16">
          <Reveal>
            <Link
              href="/flavors"
              className="text-xs uppercase tracking-[0.25em] text-bone-dim hover:text-bone transition-colors"
            >
              &larr; All flavors
            </Link>

            <p className="mt-8 text-xs uppercase tracking-[0.35em] text-bone-dim">
              {flavor.category === "classic" ? "Classic" : "Experimental"}
            </p>
            <h1 className="mt-3 text-5xl sm:text-6xl uppercase leading-[0.95] text-balance">
              {flavor.name}
            </h1>

            <p className="mt-6 text-lg text-bone-dim max-w-md">
              {flavor.shortDescription}
            </p>

            <div className="mt-8 inline-flex items-center gap-3 border border-bone/20 px-5 py-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-bone-dim">
                Finishing touch
              </span>
              <span className="text-sm">{flavor.finishingTouch}</span>
            </div>

            <p className="mt-10 max-w-md leading-relaxed text-bone-dim whitespace-pre-line">
              {flavor.longDescription}
            </p>

            <Link
              href="/book"
              className="mt-10 inline-block text-xs uppercase tracking-[0.25em] bg-bone text-ink px-7 py-4 hover:bg-cherry hover:text-bone transition-colors"
            >
              Book Adelina for your event
            </Link>
          </Reveal>
        </div>
      </section>

      {flavor.galleryImageUrls && flavor.galleryImageUrls.length > 0 && (
        <section className="px-5 sm:px-8 py-20">
          <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-3 gap-4">
            {flavor.galleryImageUrls.map((url, i) => (
              <MediaFrame
                key={url}
                src={url}
                alt={`${flavor.name} gallery image ${i + 1}`}
                tone={toneForFlavor(flavor.slug)}
                className="aspect-square"
              />
            ))}
          </div>
        </section>
      )}

      {more.length > 0 && (
        <section className="px-5 sm:px-8 py-20 bg-ink-soft">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs uppercase tracking-[0.35em] text-bone-dim">
              More flavors
            </p>
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
              {more.map((f) => (
                <FlavorCard key={f._id} flavor={f} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
