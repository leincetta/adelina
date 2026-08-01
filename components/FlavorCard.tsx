import Link from "next/link";
import { MediaFrame } from "./MediaFrame";
import { toneForFlavor } from "@/lib/flavor-tone";
import type { Flavor } from "@/lib/types";

export function FlavorCard({ flavor }: { flavor: Flavor }) {
  return (
    <Link
      href={`/flavors/${flavor.slug}`}
      className="group block"
    >
      <MediaFrame
        src={flavor.heroImageUrl}
        alt={flavor.name}
        tone={toneForFlavor(flavor.slug)}
        label={flavor.name}
        className="aspect-[4/5] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
      />
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.15em] text-bone">
            {flavor.name}
          </p>
          <p className="mt-1 text-xs text-bone-dim">{flavor.finishingTouch}</p>
        </div>
        <span className="mt-0.5 shrink-0 text-[10px] uppercase tracking-[0.2em] text-bone-dim/70">
          {flavor.category === "classic" ? "Classic" : "Experimental"}
        </span>
      </div>
    </Link>
  );
}
