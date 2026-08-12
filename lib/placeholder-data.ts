import type { Flavor, StorySettings } from "./types";

/**
 * Local fallback content. Used whenever Sanity isn't configured yet, or a
 * query comes back empty, so the site never ships blank. Mirrors the
 * documents `scripts/seed.ts` pushes into a real Sanity dataset.
 */

export const placeholderFlavors: Flavor[] = [
  {
    _id: "placeholder-zabaione",
    name: "Zabaione",
    slug: "zabaione",
    category: "classic",
    shortDescription:
      "Egg yolk and Marsala, whipped until it's somewhere between custard and memory.",
    longDescription:
      "This is the one that started it. Egg yolks and sugar cooked slow over Marsala wine until they turn into something that isn't quite custard and isn't quite anything else — then folded cold into the base. It tastes the way a good toast feels: warm, a little boozy, meant to be shared. Every Argentine kitchen has a version of this. Ours just happens to be frozen.",
    finishingTouch: "Amarena cherry, always.",
    isFeatured: true,
    isPlaceholder: true,
  },
  {
    _id: "placeholder-chocolate",
    name: "Fondente",
    slug: "chocolate",
    category: "classic",
    shortDescription: "Dark chocolate, cocoa-forward, no apologies.",
    longDescription:
      "70% cocoa, melted and worked into the base until it sets dense and matte, more like a good bar of chocolate than a milkshake. No vanilla hiding behind it, no sugar rush up front — just chocolate doing the one thing it's supposed to do. We serve it a few degrees warmer than the rest of the case so it stays soft enough to fold onto a spoon.",
    finishingTouch: "Flaky sea salt.",
    isFeatured: true,
    isPlaceholder: true,
  },
  {
    _id: "placeholder-pistachio",
    name: "Pistachio",
    slug: "pistachio",
    category: "classic",
    shortDescription: "Slow-roasted pistachio, green the way it should actually be — not from food coloring.",
    longDescription:
      "Real pistachio gelato is never neon. Ours comes from pistachios we roast and grind ourselves, low and slow, until the oil starts to show through. It's earthy before it's sweet, a little savory at the edges, and it's the flavor that tells you whether a gelato shop actually knows what it's doing.",
    finishingTouch: "Toasted pistachio dust.",
    isFeatured: true,
    isPlaceholder: true,
  },
  {
    _id: "placeholder-fior-di-latte",
    name: "Fior di Latte",
    slug: "fior-di-latte",
    category: "classic",
    shortDescription: "Cream and milk, nothing to hide behind — the flavor everyone judges the rest by.",
    longDescription:
      "No mix-ins, no fruit, no chocolate — just cream, milk, and sugar, balanced until it tastes like the best version of itself. It's the flavor we use to test a new batch of base before anything else gets added to it. Simple isn't the same as easy.",
    finishingTouch: "A thread of good olive oil and flaky salt.",
    isFeatured: false,
    isPlaceholder: true,
  },
  {
    _id: "placeholder-fig-port",
    name: "Fig & Port",
    slug: "fig-and-port",
    category: "experimental",
    shortDescription: "Roasted figs, reduced tawny port, and enough time for both to slow down.",
    longDescription:
      "Figs roasted until they collapse, folded through a base steeped with tawny port reduced down to almost nothing but flavor. It's dark, a little grown-up, closer to what you'd want after dinner with the lights low than anything you'd hand a kid at a birthday party. This one's for the adults in the room.",
    finishingTouch: "Reduced port wine glaze.",
    isFeatured: true,
    isPlaceholder: true,
  },
  {
    _id: "placeholder-peanut-dulce",
    name: "Peanut Butter & Dulce de Leche",
    slug: "peanut-butter-dulce-de-leche",
    category: "experimental",
    shortDescription: "An American classic meets an Argentine one, and neither backs down.",
    longDescription:
      "Roasted peanut butter, swirled hard through housemade dulce de leche cooked down until it's dark and slightly burnt at the edges — the way my mother liked it best. It's the flavor that gets the most texts the next morning. Salty, sweet, a little nostalgic no matter which side of the equator you grew up on.",
    finishingTouch: "Torn peanut brittle.",
    isFeatured: true,
    isPlaceholder: true,
  },
  {
    _id: "placeholder-rum-banana",
    name: "Rum-Caramelized Banana",
    slug: "rum-caramelized-banana",
    category: "experimental",
    shortDescription: "Bananas caramelized hard in brown sugar and dark rum, right to the edge of burnt.",
    longDescription:
      "We caramelize the bananas in brown sugar and dark rum until the pan almost goes too far — that's the point where it tastes like something. Blended into the base while it's still warm, so you get soft ribbons of caramelized fruit instead of a uniform banana flavor. Tastes like the last night of a trip you didn't want to end.",
    finishingTouch: "Burnt rum caramel drizzle.",
    isFeatured: false,
    isPlaceholder: true,
  },
];

export const placeholderStory: StorySettings = {
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
  ],
  chefName: "Leandro Incetta",
  welcomeEmailSubject: "You're in — welcome to the Pint Club",
  welcomeEmailBody:
    "You're on the list.\n\nFlavor drops, pop-up locations, and pint restocks — every two weeks, straight to this inbox. Nothing else.\n\nSee you at the next one.\n\n— Adelina",
  isPlaceholder: true,
};
