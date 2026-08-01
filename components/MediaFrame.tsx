import Image from "next/image";

type Tone = "cherry" | "pistachio" | "zabaione" | "fig" | "caramel" | "ink";

const TONE_GRADIENTS: Record<Tone, string> = {
  cherry: "from-cherry/90 via-ink to-ink",
  pistachio: "from-pistachio/80 via-ink to-ink",
  zabaione: "from-zabaione/80 via-ink to-ink",
  fig: "from-fig/90 via-ink to-ink",
  caramel: "from-caramel/80 via-ink to-ink",
  ink: "from-ink-soft via-ink to-ink",
};

interface MediaFrameProps {
  src?: string | null;
  alt: string;
  tone?: Tone;
  label?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  fill?: boolean;
}

/**
 * Renders a CMS image via next/image when one exists. Otherwise renders a
 * moody gradient + film-grain stand-in so the site never looks broken before
 * real photography is uploaded in Sanity Studio.
 */
export function MediaFrame({
  src,
  alt,
  tone = "ink",
  label,
  priority = false,
  sizes = "100vw",
  className = "",
  fill = true,
}: MediaFrameProps) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill={fill}
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
        <div className="grain-overlay" />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${TONE_GRADIENTS[tone]} ${className}`}
    >
      <div className="grain-overlay" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
        <span className="text-[10px] uppercase tracking-[0.35em] text-bone/50 border border-bone/25 px-2.5 py-1 rounded-full">
          Placeholder image
        </span>
        {label && (
          <span className="text-xs uppercase tracking-[0.2em] text-bone/40 max-w-xs">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
