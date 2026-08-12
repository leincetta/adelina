export type FlavorCategory = "classic" | "experimental";

export interface Flavor {
  _id: string;
  name: string;
  slug: string;
  category: FlavorCategory;
  shortDescription: string;
  longDescription: string;
  finishingTouch: string;
  heroImageUrl?: string;
  galleryImageUrls?: string[];
  isFeatured: boolean;
  isPlaceholder?: boolean;
}

export interface StorySettings {
  homepageTagline: string;
  homepageSubline?: string;
  heroImageUrl?: string;
  heroVideoUrl?: string;
  ctaHeading: string;
  storyHeading: string;
  storyIntro?: string;
  storyBody: string[];
  storyImageUrl?: string;
  chefName: string;
  welcomeEmailSubject: string;
  welcomeEmailBody: string;
  isPlaceholder?: boolean;
}
