import { gsap } from "gsap";

interface RefType {
  current: HTMLElement | null;
}

// The sequence used to run ~7.5s with no page content rendered behind it.
// Content now renders immediately and the loader is only an overlay, but it
// still covers the page, so the whole thing is kept to roughly a second.
const INTRO_DURATION = 1;
const SETTLE_DURATION = 0.25;
const COLLAPSE_DURATION = 0.5;

// Where the collapse starts, relative to the end of the intro/progress pair.
export const COLLAPSE_OFFSET = "-=0.35";

export const introAnimation = (wordGroupRef: RefType) => {
  const timeLine = gsap.timeline();

  timeLine.to(wordGroupRef.current, {
    yPercent: -80,
    duration: INTRO_DURATION,
    ease: "power3.inOut",
  });

  return timeLine;
};

export const progressAnimation = (
  progressRef: RefType,
  progressNumberRef: RefType
) => {
  const timeLine = gsap.timeline();
  timeLine
    .to(progressRef.current, {
      scaleX: 1,
      duration: INTRO_DURATION,
      ease: "power3.inOut",
    })
    .to(
      progressNumberRef.current,
      {
        x: "100vw",
        duration: INTRO_DURATION,
        ease: "power3.inOut",
      },
      "<"
    )
    .to(
      progressNumberRef.current,
      {
        textContent: "100",
        duration: INTRO_DURATION,
        roundProps: "textContent",
      },
      "<"
    )
    .to(progressNumberRef.current, {
      y: 24,
      autoAlpha: 0,
      duration: SETTLE_DURATION,
    })
    .to(
      progressRef.current,
      {
        scaleY: 0,
        duration: SETTLE_DURATION,
      },
      "<"
    );

  return timeLine;
};

export const collapseWords = (loaderRef: RefType) => {
  const timeLine = gsap.timeline();

  timeLine.to(loaderRef.current, {
    "clip-path": "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)",
    duration: COLLAPSE_DURATION,
    ease: "expo.inOut",
  });

  return timeLine;
};
