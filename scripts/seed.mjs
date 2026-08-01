// Pushes the same starter content from lib/placeholder-data.ts into your
// real Sanity dataset, so Studio isn't empty on first login.
//
// Usage (after you've created a Sanity project and set env vars):
//   node --env-file=.env.local scripts/seed.mjs
//
// Requires SANITY_API_TOKEN with "Editor" permissions (create one at
// https://www.sanity.io/manage -> your project -> API -> Tokens).
//
// Note: flavors are seeded with text content only. Sanity's "required"
// field rule is enforced in Studio's UI, not by the write API, so this
// script can create documents without hero images — open Studio afterward
// and drag a photo into each flavor's Hero image field.

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-06-01";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN.\n" +
      "Set them in .env.local first, then run:\n" +
      "  node --env-file=.env.local scripts/seed.mjs"
  );
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

const flavors = [
  {
    _id: "flavor-zabaione",
    _type: "flavor",
    name: "Zabaione",
    slug: { _type: "slug", current: "zabaione" },
    category: "classic",
    order: 1,
    shortDescription:
      "Egg yolk and Marsala, whipped until it's somewhere between custard and memory.",
    longDescription:
      "This is the one that started it. Egg yolks and sugar cooked slow over Marsala wine until they turn into something that isn't quite custard and isn't quite anything else — then folded cold into the base. It tastes the way a good toast feels: warm, a little boozy, meant to be shared. Every Argentine kitchen has a version of this. Ours just happens to be frozen.",
    finishingTouch: "Amarena cherry, always.",
    isFeatured: true,
  },
  {
    _id: "flavor-chocolate",
    _type: "flavor",
    name: "Fondente",
    slug: { _type: "slug", current: "chocolate" },
    category: "classic",
    order: 2,
    shortDescription: "Dark chocolate, cocoa-forward, no apologies.",
    longDescription:
      "70% cocoa, melted and worked into the base until it sets dense and matte, more like a good bar of chocolate than a milkshake. No vanilla hiding behind it, no sugar rush up front — just chocolate doing the one thing it's supposed to do.",
    finishingTouch: "Flaky sea salt.",
    isFeatured: true,
  },
  {
    _id: "flavor-pistachio",
    _type: "flavor",
    name: "Pistachio",
    slug: { _type: "slug", current: "pistachio" },
    category: "classic",
    order: 3,
    shortDescription:
      "Slow-roasted pistachio, green the way it should actually be — not from food coloring.",
    longDescription:
      "Real pistachio gelato is never neon. Ours comes from pistachios we roast and grind ourselves, low and slow, until the oil starts to show through. It's earthy before it's sweet, a little savory at the edges.",
    finishingTouch: "Toasted pistachio dust.",
    isFeatured: true,
  },
  {
    _id: "flavor-fior-di-latte",
    _type: "flavor",
    name: "Fior di Latte",
    slug: { _type: "slug", current: "fior-di-latte" },
    category: "classic",
    order: 4,
    shortDescription:
      "Cream and milk, nothing to hide behind — the flavor everyone judges the rest by.",
    longDescription:
      "No mix-ins, no fruit, no chocolate — just cream, milk, and sugar, balanced until it tastes like the best version of itself. It's the flavor we use to test a new batch of base before anything else gets added to it.",
    finishingTouch: "A thread of good olive oil and flaky salt.",
    isFeatured: false,
  },
  {
    _id: "flavor-fig-port",
    _type: "flavor",
    name: "Fig & Port",
    slug: { _type: "slug", current: "fig-and-port" },
    category: "experimental",
    order: 5,
    shortDescription: "Roasted figs, reduced tawny port, and enough time for both to slow down.",
    longDescription:
      "Figs roasted until they collapse, folded through a base steeped with tawny port reduced down to almost nothing but flavor. It's dark, a little grown-up, closer to what you'd want after dinner with the lights low.",
    finishingTouch: "Reduced port wine glaze.",
    isFeatured: true,
  },
  {
    _id: "flavor-peanut-dulce",
    _type: "flavor",
    name: "Peanut Butter & Dulce de Leche",
    slug: { _type: "slug", current: "peanut-butter-dulce-de-leche" },
    category: "experimental",
    order: 6,
    shortDescription: "An American classic meets an Argentine one, and neither backs down.",
    longDescription:
      "Roasted peanut butter, swirled hard through housemade dulce de leche cooked down until it's dark and slightly burnt at the edges. Salty, sweet, a little nostalgic no matter which side of the equator you grew up on.",
    finishingTouch: "Torn peanut brittle.",
    isFeatured: true,
  },
  {
    _id: "flavor-rum-banana",
    _type: "flavor",
    name: "Rum-Caramelized Banana",
    slug: { _type: "slug", current: "rum-caramelized-banana" },
    category: "experimental",
    order: 7,
    shortDescription: "Bananas caramelized hard in brown sugar and dark rum, right to the edge of burnt.",
    longDescription:
      "We caramelize the bananas in brown sugar and dark rum until the pan almost goes too far — that's the point where it tastes like something. Blended into the base while it's still warm, so you get soft ribbons of caramelized fruit instead of a uniform banana flavor.",
    finishingTouch: "Burnt rum caramel drizzle.",
    isFeatured: false,
  },
];

const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  homepageTagline: "Gelato is a five-minute love affair.",
  homepageSubline: "Small-batch, Brooklyn-made, meant to be shared.",
  ctaHeading: "Bring Adelina to your table.",
  storyHeading: "A flavor story from Buenos Aires to Brooklyn.",
  storyIntro:
    "Everyone has a flavor that takes them somewhere. This is where mine started, and where it landed.",
  storyBody: [
    "Leandro Incetta grew up in Buenos Aires between two kitchens: his mother's Spanish side and his father's Italian one, both loud, both certain they were right about everything, both usually cooking at the same time. Gelato wasn't dessert in that house — it was the thing that showed up at the end of every party, in your hand instead of on a plate, passed between people who'd already had a little too much wine to bother with spoons of their own.",
    "Twelve years ago he moved to the U.S. and kept cooking, eventually training under chef Morgan Morano and learning gelato the way it's actually made — slow, small-batch, obsessive about the base long before anyone thinks about flavor. What came out the other side wasn't a translation of an Argentine or Italian classic. It was something else: familiar enough to trigger a memory, unfamiliar enough to make new ones.",
    "Adelina is that project. Not a shop, not a menu — a batch of gelato made by hand in Brooklyn, built for the moments where good food and good company blur into the same thing. A spoon passed to the person next to you at a party. Something cold and a little indulgent, held like a drink, on a warm night with people you actually want to be around.",
    "Every flavor here has a story behind it, usually one that starts with someone's childhood and ends with a version of it that only makes sense as gelato. That's the whole idea.",
  ].map((text) => ({
    _type: "block",
    _key: text.slice(0, 8),
    children: [{ _type: "span", _key: `${text.slice(0, 8)}-s`, text }],
  })),
  chefName: "Leandro Incetta",
};

async function seed() {
  console.log(`Seeding dataset "${dataset}" on project "${projectId}"...`);
  const transaction = client.transaction();
  for (const flavor of flavors) {
    transaction.createOrReplace(flavor);
  }
  transaction.createOrReplace(siteSettings);
  await transaction.commit();
  console.log(`Seeded ${flavors.length} flavors + site settings.`);
  console.log("Open /studio and add hero images to each flavor when you have photography.");
}

seed().catch((error) => {
  console.error("Seed failed:", error.message);
  process.exit(1);
});
