import type { Metadata } from "next";
import { FlavorCard } from "@/components/FlavorCard";
import { Reveal } from "@/components/Reveal";
import { getAllFlavors } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Flavors",
  description:
    "Classic and experimental gelato flavors from Adelina — zabaione, pistachio, fig and port, and more, made small-batch in Brooklyn.",
};

export default async function FlavorsPage() {
  const flavors = await getAllFlavors();
  const classics = flavors.filter((f) => f.category === "classic");
  const experimental = flavors.filter((f) => f.category === "experimental");

  return (
    <div className="pt-32 pb-28 px-5 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-bone-dim">
            The case
          </p>
          <h1 className="mt-3 text-5xl sm:text-6xl md:text-7xl uppercase leading-none">
            Flavors
          </h1>
          <p className="mt-6 max-w-xl text-bone-dim">
            A rotating case of classics and things we couldn&apos;t stop thinking
            about. Every flavor has a finishing touch — never just a scoop.
          </p>
        </Reveal>

        {classics.length > 0 && (
          <section className="mt-20">
            <Reveal>
              <h2 className="text-xs uppercase tracking-[0.35em] text-bone-dim border-b border-bone/10 pb-4">
                Classics
              </h2>
            </Reveal>
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4">
              {classics.map((flavor, i) => (
                <Reveal key={flavor._id} delay={i * 70}>
                  <FlavorCard flavor={flavor} />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {experimental.length > 0 && (
          <section className="mt-24">
            <Reveal>
              <h2 className="text-xs uppercase tracking-[0.35em] text-bone-dim border-b border-bone/10 pb-4">
                Experimental
              </h2>
            </Reveal>
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4">
              {experimental.map((flavor, i) => (
                <Reveal key={flavor._id} delay={i * 70}>
                  <FlavorCard flavor={flavor} />
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
