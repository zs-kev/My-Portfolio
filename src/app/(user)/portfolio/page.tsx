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

export default async function Portfolio() {
  const portfolioItems = await client.fetch(query);

  return (
    <>
      <section className={styles.portfolioSection}>
        <h1>Bigger. Bolder. Better.</h1>
        <p className={styles.introText}>
          I work with people who are as dedicated to their craft as I am to
          mine. And, I do everything with my core values of honesty, hard work,
          and trust.
        </p>
        <PortfolioList portfolioItems={portfolioItems} />
      </section>
      <section className={styles.sideBar}>
        <div>
          <p>
            All the projects that I have worked on, from design to development.
          </p>
          <div className={styles.line} />
          <Link className={styles.link} href="#">
            All Projects
            <div />
          </Link>
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
