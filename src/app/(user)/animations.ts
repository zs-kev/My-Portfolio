import { gsap } from "gsap";
import SplitType from "split-type";

export const animateHero = () => {
  const kevinText = SplitType.create("[data-kevin]", { types: "chars" });
  const kevinChars = kevinText.chars;
  const simonText = SplitType.create("[data-simon]", { types: "chars" });
  const simonChars = simonText.chars;
  const intro = SplitType.create("[data-intro-text]");
  const introLines = intro.lines;

  const tl = gsap.timeline({
    defaults: {
      ease: "expo.out",
      duration: 2,
    },
  });

  tl.to("[data-image-overlay]", {
    height: 0,
  })
    .to(
      "[data-hello]",
      {
        y: 0,
      },
      "<0.5"
    )
    .to(
      "[data-i]",
      {
        y: 0,
      },
      "<0.1"
    )
    .to(
      "[data-am]",
      {
        y: 0,
      },
      "<0.1"
    )
    .to(
      "[data-hero-image]",
      {
        scale: 1,
        opacity: 1,
        duration: 3.5,
        ease: "power2.inOut",
      },
      "<"
    )
    .to(
      "[data-image-shadow]",
      {
        scale: 1,
        opacity: 1,
        duration: 3,
        ease: "power2.inOut",
      },
      "<"
    )
    .to(
      "[data-kevin]",
      {
        opacity: 1,
        duration: 0.01,
      },
      "<"
    )
    .to(
      "[data-simon]",
      {
        opacity: 1,
        duration: 0.01,
      },
      "<"
    )
    .fromTo(
      kevinChars,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        ease: "power2.out",
        duration: 1,
      },
      "<0.5"
    )
    .fromTo(
      simonChars,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        ease: "power2.out",
        duration: 1,
      },
      "<1"
    )
    .to(
      "[data-intro-text]",
      {
        opacity: 1,
        duration: 0.01,
      },
      "<"
    )
    .fromTo(
      introLines,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        ease: "power2.out",
        duration: 1,
      },
      "<1"
    );

  return tl;
};
