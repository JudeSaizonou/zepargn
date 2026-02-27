const fallbackProjectId = "missing-project-id";
const fallbackDataset = "missing-dataset";

export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? fallbackProjectId;
export const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? fallbackDataset;
export const sanityApiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01";

export const hasSanityConfig =
  sanityProjectId !== fallbackProjectId && sanityDataset !== fallbackDataset;

