"use client";

import TechStack from "@/components/about/techStack/TechStack";
import ButtonUnderline from "@/components/buttons/underlineButton/ButtonUnderLine";
import PortfolioSelected from "@/components/portfolio/selectedSection/PortfolioSelected";
import DownArrow from "@/lib/assets/icons/DownArrow";
import FrontendMentor from "@/lib/assets/icons/FrontendMentor";
import Github from "@/lib/assets/icons/Github";
import Insta from "@/lib/assets/icons/Instagram";
import Linkedin from "@/lib/assets/icons/Linkedin";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { animateHero } from "./animations";
import styles from "./page.module.css";

export default function Home() {
  const heroRef = useRef(null);
  const timeline = useRef(gsap.timeline());

  useEffect(() => {
    const context = gsap.context(() => {
      const tl = timeline.current;

      tl.add(animateHero());
    }, heroRef);

    return () => context.revert();
  }, []);

  return (
    <>
      {/* --------- Hero Section --------- */}

      <section className={styles.heroSection} ref={heroRef}>
        <div className={styles.gridContainer}>
          <p className={styles.hello}>
            <span data-hello>Hello,</span> <span data-i>I</span>{" "}
            <span data-am>am</span>
          </p>
          <h1
            className={`headingSpecial  ${styles.heroKevin} ${styles.h1}`}
            data-kevin
          >
            Kevin
          </h1>
          <h2
            className={`headingSpecial  ${styles.heroSimon} ${styles.h2}`}
            data-simon
          >
            Simon
          </h2>
          <div className={styles.textContainer}>
            <div>
              <p>
                I am an aspiring full-stack developer based in South Africa.
                With a growing expertise in front-end and back-end technologies.
              </p>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <Link href={"#about-home"}>
              <span>Let&apos;s Meet</span>
              <DownArrow />
            </Link>
          </div>
          <div className={styles.imageContainer}>
            <Image
              src={"/assets/images/kevin-simon.png"}
              alt={"Kevin Simon Portrait"}
              priority
              width="0"
              height="0"
              sizes="100vw"
              className={styles.image}
              data-hero-image
            />
          </div>
        </div>
        <div className={styles.backgroundBlur} data-image-shadow></div>
        <div data-image-overlay className={styles.imageOverlay}></div>

        <div className={styles.leftBar}>
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
      </section>

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
                width="0"
                height="0"
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
