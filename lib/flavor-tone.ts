const TONES = ["cherry", "pistachio", "zabaione", "fig", "caramel"] as const;
export type FlavorTone = (typeof TONES)[number];

/** Deterministically assigns one of the palette accent tones to a flavor, so cards vary without needing an extra CMS field. */
export function toneForFlavor(slug: string): FlavorTone {
  let hash = 0;
  for (const char of slug) hash = (hash * 31 + char.charCodeAt(0)) % 997;
  return TONES[hash % TONES.length];
}
