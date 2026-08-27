import { gsap } from "gsap";
import SplitType from "split-type";

// SplitType replaces the element's text with one <div> per character or line.
// That leaves the h1 as five block-level divs reading "K" "e" "v" "i" "n", so
// its accessible text is destroyed. Stash the real text as a label and hide
// the generated pieces from assistive tech; the animation is unaffected.
const preserveAccessibleText = (
  selector: string,
  split: () => (HTMLElement[] | null | undefined)[]
) => {
  const el = document.querySelector<HTMLElement>(selector);
  const text = el?.textContent?.trim();

  const pieces = split();

  if (el && text) {
    el.setAttribute("aria-label", text);
    for (const group of pieces) {
      for (const piece of group ?? [])
        piece.setAttribute("aria-hidden", "true");
    }
  }
};

export const animateHero = () => {
  let kevinChars: HTMLElement[] | null = null;
  preserveAccessibleText("[data-kevin]", () => {
    kevinChars = SplitType.create("[data-kevin]", { types: "chars" }).chars;
    return [kevinChars];
  });

  let simonChars: HTMLElement[] | null = null;
  preserveAccessibleText("[data-simon]", () => {
    simonChars = SplitType.create("[data-simon]", { types: "chars" }).chars;
    return [simonChars];
  });

  let introLines: HTMLElement[] | null = null;
  preserveAccessibleText("[data-intro-text]", () => {
    const intro = SplitType.create("[data-intro-text]");
    introLines = intro.lines;
    return [intro.chars, intro.words, intro.lines];
  });

  const tl = gsap.timeline({
    defaults: {
      ease: "expo.out",
      duration: 2,
    },
  });

  tl.to(
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
