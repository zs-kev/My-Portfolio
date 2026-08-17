import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "@/sanity/env";

// Config comes from src/sanity/env.ts, which is the single source of truth: it
// asserts the two required variables with readable error messages and defaults
// the API version. Reading the variables directly here used to pass an
// undefined apiVersion straight into createClient, which throws at module load
// and takes down every page that imports this file.
//
// useCdn is on because every consumer of this client reads published content.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
