"use client";

import ScrollCue from "@/components/scrollCue/ScrollCue";
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
      {/* Everything the intro reveals ships hidden — the headings, intro copy,
          portrait and glow at opacity 0, and "Hello, I am" translated out of
          an overflow-hidden parent. With JS off nothing ever reveals it, so
          the hero was blank apart from the button and the social bar.

          This overrides that to the animation's own end state, and only when
          scripting is off: <noscript> content is inert in a scripting browser,
          so the JS path is untouched and there is no flash. It keys off the
          same data attributes the timeline animates rather than the CSS module
          class names, which are hashed at build time and cannot be targeted
          from here. */}
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<style>
            [data-hello], [data-i], [data-am] { transform: none !important; }
            [data-kevin], [data-simon], [data-intro-text] { opacity: 1 !important; }
            [data-hero-image] { opacity: 1 !important; transform: none !important; }
            /* Keeps the centring translate — this one is translateX(-50%) scale(0.8),
               so transform:none would shunt the glow half its width off centre. */
            [data-image-shadow] { opacity: 1 !important; transform: translateX(-50%) !important; }
          </style>`,
        }}
      />
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
            // The portrait is 533x704. It used to declare width/height 0,
            // which removes the aspect-ratio box so no space is reserved
            // until it loads, and sizes="100vw" told the browser to fetch a
            // candidate sized for the full viewport width. CSS still drives
            // the rendered size (height: 85vh, width: auto); these only
            // supply the ratio.
            width={533}
            height={704}
            className={styles.image}
            data-hero-image
          />
        </div>
      </div>
      <div className={styles.backgroundBlur} data-image-shadow></div>

      {/* One rail. The cue and the icons stack in a single column so they
          share an axis and the gap between them is a real gap — as two
          absolutely-positioned boxes they only looked aligned, and the cue's
          offset was a number derived from how many social links there happen
          to be. */}
      <div className={styles.leftRail}>
        <ScrollCue />
        <SocialIconLinks className={styles.leftBar} />
      </div>
    </section>
  );
}
