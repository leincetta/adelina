import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings & Story",
  type: "document",
  fields: [
    defineField({
      name: "homepageTagline",
      title: "Homepage tagline",
      description: "The short, punchy line in the hero. Keep it to one breath.",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "homepageSubline",
      title: "Homepage subline",
      description: "A second, quieter line under the tagline. Optional.",
      type: "string",
    }),
    defineField({
      name: "heroImage",
      title: "Homepage hero image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "ctaHeading",
      title: "Booking CTA heading",
      description: "The line above the \"Book an event\" button at the end of the homepage.",
      type: "string",
      initialValue: "Bring Adelina to your table.",
    }),
    defineField({
      name: "storyHeading",
      title: "Story page heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "storyIntro",
      title: "Story intro line",
      description: "Large opening line at the top of the Story page.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "storyBody",
      title: "Story body",
      description: "The full story — bio, philosophy, motivation. Editorial tone.",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "storyImage",
      title: "Story page portrait / image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "chefName",
      title: "Chef name",
      type: "string",
      initialValue: "Leandro Incetta",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings & Story" }),
  },
});
