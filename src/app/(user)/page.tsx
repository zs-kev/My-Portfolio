import TechStack from "@/components/about/techStack/TechStack";
import ButtonUnderline from "@/components/buttons/underlineButton/ButtonUnderLine";
import PortfolioSelected from "@/components/portfolio/selectedSection/PortfolioSelected";
import Image from "next/image";
import Hero from "./Hero";
import styles from "./page.module.css";

// A Server Component again, so it can carry its own metadata. The title
// template in the layout turns this into "Home — Kevin Simon"; the homepage
// keeps the layout's default title instead, which already names the role.
export const metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />

      {/* --------- About Me Section --------- */}

      <section id="about-home" className={styles.aboutSection}>
        <div className="max-width-wrapper">
          <div className={styles.aboutContainer}>
            <p>
              I am a self-taught web developer based in vibrant Johannesburg,
              South Africa. With a deep passion for creating beautiful and
              engaging websites, I thrive on taking projects from a blank code
              editor and watching them grow alongside my skills.
            </p>
            <p>
              Front-end development with React and Next.js truly captivates me,
              but what drives me even more is the opportunity to infuse
              everything I do with my core values of honesty, hard work, and
              trust. With these values as my compass, I strive to deliver
              exceptional digital experiences that leave a lasting impact.
            </p>
            <div className={styles.aboutFlexContainer}>
              <Image
                src="/assets/images/kevin-simon-sig.svg"
                alt="Kevin Simon"
                // Matches the SVG's own viewBox. Was 0x0 with no sizes at all.
                width={164}
                height={20}
                // CSS sets the width; this keeps the height proportional to it
                // rather than stretching to the flex line, which is what
                // next/image warns about when only one axis is overridden.
                style={{ height: "auto" }}
              />
              <ButtonUnderline link={"/about"}>About Me</ButtonUnderline>
            </div>
          </div>
        </div>
      </section>

      {/* --------- My Skills Section --------- */}

      <TechStack>My Skills</TechStack>

      {/* --------- Portfolio Selected Works Section --------- */}

      <PortfolioSelected />
    </>
  );
}
