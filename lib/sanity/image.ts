import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { dataset, projectId } from "./env";

const builder = projectId
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

export function urlForImage(source?: Image | null) {
  if (!builder || !source?.asset?._ref) return undefined;
  return builder.image(source).auto("format").fit("max");
}
