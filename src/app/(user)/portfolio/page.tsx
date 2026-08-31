import SocialIconLinks from "@/components/socials/SocialIconLinks";
import PortfolioList from "@/components/portfolio/allItems/PortfolioList";
import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";
import Link from "next/link";
import styles from "./page.module.css";

const query = groq`
*[_type=='portfolio'] | order(_createdAt desc) {
  _id,
  title,
  slug,
  featureImage,
  client->{
    title,
  },
  categories[]->{
    title
  }
}
`;

export const revalidate = 60;

export const metadata = {
  title: "Portfolio",
  description:
    "Selected web design and development work by Kevin Simon — from design through to build, using React and Next.js.",
  alternates: { canonical: "/portfolio" },
  openGraph: { url: "/portfolio", title: "Portfolio" },
};

type Props = {
  // Next 16: search params are async, same as route params.
  searchParams: Promise<{ category?: string | string[] }>;
};

export default async function Portfolio({ searchParams }: Props) {
  const { category } = await searchParams;
  const portfolioItems = await client.fetch(query);

  // Derived from what is actually published rather than fetched separately, so
  // a category nothing uses never shows up as a filter that leads to an empty
  // page. A reference to a deleted category dereferences to null, hence the
  // guards.
  const categories: string[] = Array.from(
    new Set(
      (portfolioItems ?? []).flatMap((item: any) =>
        (item.categories ?? [])
          .map((entry: any) => entry?.title)
          .filter(Boolean)
      )
    )
  ).sort() as string[];

  const requested = Array.isArray(category) ? category[0] : category;

  // A hand-typed or stale ?category= shows everything rather than an empty
  // page that looks like the portfolio is bare.
  const activeCategory =
    requested && categories.includes(requested) ? requested : null;

  const visibleItems = activeCategory
    ? portfolioItems.filter((item: any) =>
        (item.categories ?? []).some(
          (entry: any) => entry?.title === activeCategory
        )
      )
    : portfolioItems;

  return (
    <>
      <section className={styles.portfolioSection}>
        <h1>Bigger. Bolder. Better.</h1>
        <p className={styles.introText}>
          I work with people who are as dedicated to their craft as I am to
          mine. And, I do everything with my core values of honesty, hard work,
          and trust.
        </p>
        {/* Plain links, so filtering works without JS, survives a page reload
            and can be shared or linked to. This lives with the content rather
            than in the sidebar because .sideBar is display:none below 64rem —
            filters there would have been desktop-only. */}
        {categories.length > 0 && (
          <nav
            className={styles.filters}
            aria-label="Filter projects by category"
          >
            <Link
              href="/portfolio"
              className={styles.filter}
              aria-current={activeCategory ? undefined : "page"}
            >
              All Projects
              <div />
            </Link>
            {categories.map((title) => (
              <Link
                key={title}
                href={`/portfolio?category=${encodeURIComponent(title)}`}
                className={styles.filter}
                aria-current={activeCategory === title ? "page" : undefined}
              >
                {title}
                <div />
              </Link>
            ))}
          </nav>
        )}
        <PortfolioList portfolioItems={visibleItems} />
      </section>
      <section className={styles.sideBar}>
        <div>
          <p>
            All the projects that I have worked on, from design to development.
          </p>
          <div className={styles.line} />
          {/* "All Projects" used to sit here too. It is the filter row's job —
              that one actually filters, and it is visible below 64rem where
              this sidebar is not. Two controls with the same label, one of
              which only resets, was the confusing half. */}
          <Link className={styles.link} href="/contact">
            Get In Touch
            <div />
          </Link>
          <div className={styles.line} />
          <SocialIconLinks className={styles.socials} />
        </div>
      </section>
    </>
  );
}
