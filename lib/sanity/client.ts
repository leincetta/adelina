import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

/**
 * Only constructed when a real project ID is present. Callers must go
 * through `lib/sanity/queries.ts`, which guards every call and falls back
 * to local placeholder content when Sanity isn't configured yet.
 */
export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === "production",
      perspective: "published",
    })
  : null;
