interface PortableTextSpan {
  text?: string;
}

interface PortableTextBlock {
  _type: string;
  children?: PortableTextSpan[];
}

/** Flattens Sanity block content into plain paragraphs for simple <p> rendering. */
export function blocksToParagraphs(blocks?: PortableTextBlock[] | null): string[] {
  if (!blocks) return [];
  return blocks
    .filter((block) => block._type === "block")
    .map((block) => (block.children ?? []).map((span) => span.text ?? "").join(""))
    .filter((text) => text.trim().length > 0);
}
