import { defineField, defineType } from "sanity";

export const flavor = defineType({
  name: "flavor",
  title: "Flavor",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Classic", value: "classic" },
          { title: "Experimental", value: "experimental" },
        ],
        layout: "radio",
      },
      initialValue: "classic",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short description",
      description: "One or two sentences. Used on the flavors grid and homepage teaser.",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required().max(180),
    }),
    defineField({
      name: "longDescription",
      title: "Long description",
      description: "The full story of the flavor. Used on its detail page.",
      type: "text",
      rows: 6,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "finishingTouch",
      title: "Finishing touch",
      description: "E.g. \"Amarena cherry on zabaione\" or \"Sea salt on chocolate.\"",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "galleryImages",
      title: "Gallery images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "isFeatured",
      title: "Featured on homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Sort order",
      description: "Lower numbers appear first on the flavors page.",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Sort order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "category", media: "heroImage" },
  },
});
