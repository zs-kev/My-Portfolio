/**
 * One source of truth for the site's identity. Metadata, JSON-LD, the sitemap
 * and the social bars all read from here, so a handle or a job title changes
 * in exactly one place.
 */

// Set NEXT_PUBLIC_SITE_URL once a real domain is attached. Until then this
// resolves to the Vercel deployment, which keeps canonicals and OG URLs
// absolute and correct in preview and production alike.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

export const SITE_NAME = "Kevin Simon";
export const JOB_TITLE = "Full-Stack Developer";
export const LOCATION = "Johannesburg, South Africa";

// The old description was "My Portfolio Website" — no role, no stack, no place,
// and nothing anyone would search for.
export const SITE_DESCRIPTION =
  "Kevin Simon is a self-taught full-stack developer in Johannesburg, South Africa, building fast, engaging websites with React and Next.js.";

export type SocialLink = { label: string; href: string };

// Previously duplicated across page.tsx, portfolio/page.tsx and Socials.tsx —
// three places to keep in sync, and the source of the JSON-LD sameAs list.
export const SOCIAL_LINKS: SocialLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kevin-simon-dev/" },
  { label: "Github", href: "https://github.com/zs-kev" },
  {
    label: "FrontendMentor",
    href: "https://www.frontendmentor.io/profile/zs-kev",
  },
  { label: "Instagram", href: "https://instagram.com/kevin_coffeecycles" },
];
