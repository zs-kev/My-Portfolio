import { gsap } from "gsap";

export const animateHero = () => {
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
        duration: 2.5,
        ease: "power2.inOut",
      },
      "<"
    )
    .to(
      "[data-image-shadow]",
      {
        scale: 1,
        opacity: 1,
        duration: 2.5,
        ease: "power2.inOut",
      },
      "<"
    )
    .to(
      "[data-kevin]",
      {
        xPercent: 0,
        opacity: 1,
        ease: "power2.inOut",
      },
      "<+=0.2"
    )
    .to(
      "[data-simon]",
      {
        x: 0,
        opacity: 1,
        ease: "power2.inOut",
      },
      "<+=0.5"
    );

  return tl;
};
