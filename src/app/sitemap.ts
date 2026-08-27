import { client } from "@/lib/sanity.client";
import { SITE_URL } from "@/lib/siteConfig";
import { groq } from "next-sanity";
import type { MetadataRoute } from "next";

// Re-read hourly so a newly published project appears without a redeploy.
export const revalidate = 3600;

const query = groq`
*[_type=='portfolio' && defined(slug.current)] {
  "slug": slug.current,
  _updatedAt
}
`;

type ProjectRef = { slug: string; _updatedAt: string };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/portfolio`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.7 },
  ];

  let projects: ProjectRef[] = [];
  try {
    projects = await client.fetch(query);
  } catch (error) {
    // A sitemap missing its project URLs is far better than a build that fails
    // because the CMS was briefly unreachable.
    console.error("Sitemap: could not load projects from Sanity:", error);
  }

  return [
    ...staticRoutes,
    ...projects.map((project) => ({
      url: `${SITE_URL}/${project.slug}`,
      lastModified: project._updatedAt
        ? new Date(project._updatedAt)
        : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
