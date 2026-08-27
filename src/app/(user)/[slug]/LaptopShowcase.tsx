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

// How much scrolling the lid takes to swing open, as a fraction of the
// viewport. The rest of the runway is however far the screenshot can travel.
const OPEN_RUNWAY_VH = 0.75;

// Closed is the lid folded past flat onto the deck, screen down — which is
// why it goes beyond 90 and why the lid needs a back face. The deck sits at
// 74deg, so 104 lays the lid onto it with its outside toward the viewer.
const CLOSED_ANGLE = "104deg";
const OPEN_ANGLE = "0deg";

export default function LaptopShowcase({ image, alt }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const lidRef = useRef<HTMLDivElement>(null);
  const shotRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add(
        {
          // The full effect only where there is room for it and where motion
          // is welcome.
          full: "(min-width: 48rem) and (prefers-reduced-motion: no-preference)",
          simple:
            "(max-width: 47.99rem) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const { full } = ctx.conditions as { full: boolean };
          const lid = lidRef.current;
          const shot = shotRef.current;
          const screen = screenRef.current;
          if (!lid || !shot || !screen) return;

          if (!full) {
            // Phones: open it once as it comes into view. No pinning, no
            // scrubbing, and no scrolling a screenshot inside a small screen.
            gsap.fromTo(
              lid,
              { "--lid-angle": CLOSED_ANGLE },
              {
                "--lid-angle": OPEN_ANGLE,
                ease: "power2.out",
                duration: 1.1,
                scrollTrigger: { trigger: section, start: "top 80%" },
              }
            );
            return;
          }

          // How far the screenshot can travel inside the bezel. A short image
          // gives zero, and that phase simply takes no runway.
          const overflow = () =>
            Math.max(0, shot.scrollHeight - screen.clientHeight);

          const openPx = () => window.innerHeight * OPEN_RUNWAY_VH;
          const total = () => openPx() + overflow();

          // The runway is sized to the work: opening plus however much
          // screenshot there is, so the sticky section never outstays it.
          // This has to run on every refresh, not once — at first paint the
          // screenshot has not loaded, so the overflow measures zero and the
          // section would be too short for the travel it has to cover.
          const setRunway = () =>
            section.style.setProperty("--scroll-runway", `${overflow()}px`);
          setRunway();

          // Marks the section as driven, which is what switches the CSS into
          // its sticky, tall-runway layout. Only set here: with reduced
          // motion or no JS there is no animation, so a tall runway would be
          // dead scrolling past a laptop that is already open.
          section.dataset.scrollEffect = "on";

          gsap
            .timeline({
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.4,
                invalidateOnRefresh: true,
                // Fires before ScrollTrigger measures, so the section is the
                // right height by the time it does.
                onRefreshInit: setRunway,
              },
            })
            .fromTo(
              lid,
              { "--lid-angle": CLOSED_ANGLE },
              {
                "--lid-angle": OPEN_ANGLE,
                ease: "power2.out",
                duration: openPx() / total(),
              }
            )
            .to(shot, {
              y: () => -overflow(),
              ease: "none",
              duration: overflow() / total(),
            });

          return () => {
            delete section.dataset.scrollEffect;
          };
        }
      );

      // The screenshot loads after first paint, so the measurements above are
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
            <div className={styles.lid} ref={lidRef}>
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
