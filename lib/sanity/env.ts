export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-06-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

/** True once a real Sanity project is wired up. Until then, pages fall back to local placeholder content. */
export const isSanityConfigured = Boolean(projectId);
