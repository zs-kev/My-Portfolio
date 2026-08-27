"use client";

import ButtonUnderline from "@/components/buttons/underlineButton/ButtonUnderLine";
import SocialIconLinks from "@/components/socials/SocialIconLinks";
import DownArrow from "@/lib/assets/icons/DownArrow";
import { useIntroFinished } from "@/lib/providers/LoaderProvider/ProviderLoader";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { animateHero } from "./animations";
import styles from "./page.module.css";

// Only the hero needs the client: GSAP, and waiting for the intro to finish.
// Everything else on the home page is static or server-fetched, so keeping
// this narrow lets the page itself stay a Server Component and export
// metadata — which a "use client" page cannot do.
export default function Hero() {
  const heroRef = useRef(null);
  const introFinished = useIntroFinished();

  useEffect(() => {
    // The hero reveal is the payoff to the loader, so it waits for it. It used
    // to be gated implicitly: children did not mount until the loader
    // finished. Now that content renders immediately for crawlers, the
    // sequencing has to be explicit or the reveal plays behind the overlay
    // and the visitor only ever sees its final frame.
    if (!introFinished) return;

    const context = gsap.context(() => {
      const timeline = animateHero();

      // The hero ships at opacity 0 and is revealed by this timeline, so
      // reduced motion cannot mean "skip it" — that would leave the hero
      // invisible. Jump straight to the final frame instead: everything
      // visible, nothing moving.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        timeline.progress(1);
      }
    }, heroRef);

    return () => context.revert();
  }, [introFinished]);

  return (
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
          <div className={styles.textWrapper}>
            <p data-intro-text>
              I am an aspiring full-stack developer based in South Africa. With
              a growing expertise in front-end and back-end technologies.
            </p>
          </div>
        </div>
        <div className={styles.buttonContainer} data-round-button>
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

      <SocialIconLinks className={styles.leftBar} />
    </section>
  );
}
