import { gsap } from "gsap";
import SplitType from "split-type";

export const animateHero = () => {
  const kevinText = SplitType.create("[data-kevin]", { types: "chars" });
  const kevinChars = kevinText.chars;
  const simonText = SplitType.create("[data-simon]", { types: "chars" });
  const simonChars = simonText.chars;

  const tl = gsap.timeline({
    defaults: {
      ease: "expo.out",
      duration: 2,
    },
  });

  tl.to("[data-hello]", {
    y: 0,
  })
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
        ease: "power3.out",
        duration: 1.5,
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
        ease: "power3.out",
        duration: 1.5,
      },
      "<1"
    );

  return tl;
};
