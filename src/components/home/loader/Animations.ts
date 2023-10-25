import { gsap } from "gsap";

interface RefType {
  current: HTMLElement | null;
}

export const introAnimation = (wordGroupRef: RefType) => {
  const timeLine = gsap.timeline();

  timeLine.to(wordGroupRef.current, {
    yPercent: -80,
    duration: 5,
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
      duration: 5,
      ease: "power3.inOut",
    })
    .to(
      progressNumberRef.current,
      {
        x: "100vw",
        duration: 5,
        ease: "power3.inOut",
      },
      "<"
    )
    .to(
      progressNumberRef.current,
      {
        textContent: "100",
        duration: 5,
        roundProps: "textContent",
      },
      "<"
    )
    .to(progressRef.current, {
      y: 24,
      autoAlpha: 0,
    })
    .to(
      progressNumberRef.current,
      {
        y: 24,
        autoAlpha: 0,
      },
      "<"
    );

  return timeLine;
};

export const collapseWords = (loaderRef: RefType) => {
  const timeLine = gsap.timeline();

  timeLine.to(loaderRef.current, {
    "clip-path": "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)",
    duration: 3,
    ease: "expo.inOut",
  });

  return timeLine;
};
