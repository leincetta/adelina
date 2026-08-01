import type { Image } from "sanity";
import { sanityClient } from "./client";
import { urlForImage } from "./image";
import { blocksToParagraphs } from "./portable-text";
import { placeholderFlavors, placeholderStory } from "../placeholder-data";
import type { Flavor, StorySettings } from "../types";

interface RawFlavor {
  _id: string;
  name: string;
  slug: string;
  category: "classic" | "experimental";
  shortDescription: string;
  longDescription: string;
  finishingTouch: string;
  heroImage?: Image;
  galleryImages?: Image[];
  isFeatured?: boolean;
}

interface RawStorySettings {
  homepageTagline: string;
  homepageSubline?: string;
  heroImage?: Image;
  heroVideoUrl?: string;
  ctaHeading?: string;
  storyHeading: string;
  storyIntro?: string;
  storyBody?: { _type: string; children?: { text?: string }[] }[];
  storyImage?: Image;
  chefName?: string;
}

const FLAVOR_FIELDS = `
  _id,
  name,
  "slug": slug.current,
  category,
  shortDescription,
  longDescription,
  finishingTouch,
  heroImage,
  galleryImages,
  isFeatured
`;

function toFlavor(raw: RawFlavor): Flavor {
  return {
    _id: raw._id,
    name: raw.name,
    slug: raw.slug,
    category: raw.category,
    shortDescription: raw.shortDescription,
    longDescription: raw.longDescription,
    finishingTouch: raw.finishingTouch,
    heroImageUrl: urlForImage(raw.heroImage)?.width(1800).url(),
    galleryImageUrls: raw.galleryImages
      ?.map((img) => urlForImage(img)?.width(1200).url())
      .filter((url): url is string => Boolean(url)),
    isFeatured: Boolean(raw.isFeatured),
  };
}

export async function getAllFlavors(): Promise<Flavor[]> {
  if (!sanityClient) return placeholderFlavors;
  try {
    const raw = await sanityClient.fetch<RawFlavor[]>(
      `*[_type == "flavor"] | order(order asc, name asc) { ${FLAVOR_FIELDS} }`
    );
    if (!raw?.length) return placeholderFlavors;
    return raw.map(toFlavor);
  } catch (error) {
    console.error("Sanity: failed to fetch flavors, using placeholder content.", error);
    return placeholderFlavors;
  }
}

export async function getFeaturedFlavors(): Promise<Flavor[]> {
  const all = await getAllFlavors();
  const featured = all.filter((f) => f.isFeatured);
  return featured.length ? featured : all.slice(0, 4);
}

export async function getFlavorBySlug(slug: string): Promise<Flavor | null> {
  if (!sanityClient) {
    return placeholderFlavors.find((f) => f.slug === slug) ?? null;
  }
  try {
    const raw = await sanityClient.fetch<RawFlavor | null>(
      `*[_type == "flavor" && slug.current == $slug][0] { ${FLAVOR_FIELDS} }`,
      { slug }
    );
    if (!raw) return placeholderFlavors.find((f) => f.slug === slug) ?? null;
    return toFlavor(raw);
  } catch (error) {
    console.error(`Sanity: failed to fetch flavor "${slug}", using placeholder content.`, error);
    return placeholderFlavors.find((f) => f.slug === slug) ?? null;
  }
}

export async function getAllFlavorSlugs(): Promise<string[]> {
  const all = await getAllFlavors();
  return all.map((f) => f.slug);
}

export async function getSiteSettings(): Promise<StorySettings> {
  if (!sanityClient) return placeholderStory;
  try {
    const raw = await sanityClient.fetch<RawStorySettings | null>(
      `*[_type == "siteSettings"][0] {
        homepageTagline,
        homepageSubline,
        heroImage,
        "heroVideoUrl": heroVideo.asset->url,
        ctaHeading,
        storyHeading,
        storyIntro,
        storyBody,
        storyImage,
        chefName
      }`
    );
    if (!raw) return placeholderStory;
    const storyBody = blocksToParagraphs(raw.storyBody);
    return {
      homepageTagline: raw.homepageTagline || placeholderStory.homepageTagline,
      homepageSubline: raw.homepageSubline,
      heroImageUrl: urlForImage(raw.heroImage)?.width(2200).url(),
      heroVideoUrl: raw.heroVideoUrl,
      ctaHeading: raw.ctaHeading || placeholderStory.ctaHeading,
      storyHeading: raw.storyHeading || placeholderStory.storyHeading,
      storyIntro: raw.storyIntro,
      storyBody: storyBody.length ? storyBody : placeholderStory.storyBody,
      storyImageUrl: urlForImage(raw.storyImage)?.width(1600).url(),
      chefName: raw.chefName || placeholderStory.chefName,
    };
  } catch (error) {
    console.error("Sanity: failed to fetch site settings, using placeholder content.", error);
    return placeholderStory;
  }
}
