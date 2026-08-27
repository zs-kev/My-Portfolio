import { SITE_URL } from "@/lib/siteConfig";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The Sanity Studio is a login-walled admin screen. It was indexable, so
      // Google could surface "Kevin Simon Studio" against the owner's own name.
      disallow: ["/studio", "/studio/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
