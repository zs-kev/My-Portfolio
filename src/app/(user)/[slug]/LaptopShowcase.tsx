"use client";

import urlFor from "@/lib/urlFor";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./LaptopShowcase.module.css";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  image: any;
  alt?: string;
};

// The laptop is a static frame. The only motion is the screenshot travelling
// inside the bezel as you scroll, which is what makes it read as browsing the
// site — an opening animation was tried and dropped, since CSS 3D could not
// make the hinge convincing and the travel is the part that shows the work.
export default function LaptopShowcase({ image, alt }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const shotRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add(
        "(min-width: 48rem) and (prefers-reduced-motion: no-preference)",
        () => {
          const shot = shotRef.current;
          const screen = screenRef.current;
          if (!shot || !screen) return;

          // How far the screenshot can travel inside the bezel. A screenshot
          // no taller than the screen gives zero, and then there is nothing to
          // pin for — the section stays its natural height.
          const overflow = () =>
            Math.max(0, shot.scrollHeight - screen.clientHeight);

          // Both the runway and whether to pin at all are decided here, and
          // re-decided on every refresh. This cannot be a one-off check: at
          // first paint the screenshot has not loaded, so the overflow
          // measures zero — an early return there would disable the effect
          // permanently, and a fixed runway would be far too short for the
          // travel it has to cover.
          const setRunway = () => {
            const distance = overflow();
            section.style.setProperty("--scroll-runway", `${distance}px`);
            // No overflow means nothing to travel through, so there is nothing
            // to pin a viewport for.
            if (distance > 0) section.dataset.scrollEffect = "on";
            else delete section.dataset.scrollEffect;
          };
          setRunway();

          gsap.to(shot, {
            y: () => -overflow(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.4,
              invalidateOnRefresh: true,
              // Runs before ScrollTrigger measures, so the section is the
              // right height by the time it does.
              onRefreshInit: setRunway,
            },
          });

          return () => {
            delete section.dataset.scrollEffect;
          };
        }
      );

      // The screenshot loads after first paint, so every measurement above is
      // wrong until it does.
      const img = shotRef.current?.querySelector("img");
      if (img && !img.complete) {
        img.addEventListener("load", () => ScrollTrigger.refresh(), {
          once: true,
        });
      }
    }, section);

    return () => context.revert();
  }, []);

  if (!image) return null;

  return (
    <section
      className={styles.section}
      aria-label="Project screenshot"
      ref={sectionRef}
    >
      <div className={styles.sticky}>
        <div className={styles.stage}>
          <div className={styles.laptop}>
            <div className={styles.lid}>
              <span className={styles.camera} aria-hidden="true" />
              <div className={styles.screen} ref={screenRef}>
                <div className={styles.screenInner} ref={shotRef}>
                  <Image
                    src={urlFor(image).width(2000).fit("max").url()}
                    alt={alt ?? "Project screenshot"}
                    width={1600}
                    height={1000}
                    sizes="(max-width: 48rem) 92vw, 70vw"
                    className={styles.shot}
                  />
                </div>
              </div>
            </div>
            <div className={styles.base} aria-hidden="true">
              <div className={styles.notch} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
