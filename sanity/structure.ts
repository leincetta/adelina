import type { StructureResolver } from "sanity/structure";

/** Pins Site Settings & Story as a singleton and lists flavors below it. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Adelina")
    .items([
      S.listItem()
        .title("Site Settings & Story")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
        ),
      S.divider(),
      S.documentTypeListItem("flavor").title("Flavors"),
    ]);
