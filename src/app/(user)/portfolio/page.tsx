import PortfolioList from "@/components/portfolio/allItems/PortfolioList";
import FrontendMentor from "@/lib/assets/icons/FrontendMentor";
import Github from "@/lib/assets/icons/Github";
import Insta from "@/lib/assets/icons/Instagram";
import Linkedin from "@/lib/assets/icons/Linkedin";
import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";
import Link from "next/link";
import styles from "./page.module.css";

const query = groq`
*[_type=='portfolio'] | order(_createdAt desc) {
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

export default async function Portfolio() {
  const portfolioItems = await client.fetch(query);
  console.log(portfolioItems[0]);

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
          <div className={styles.socials}>
            <a
              href="https://www.linkedin.com/in/kevin-simon-dev/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin />
            </a>
            <a
              href="https://github.com/zs-kev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Github"
            >
              <Github />
            </a>
            <a
              href="https://www.frontendmentor.io/profile/zs-kev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Frontend Mentor"
            >
              <FrontendMentor />
            </a>
            <a
              href="https://instagram.com/kevin_coffeecycles"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Insta />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
