"use client";

import DownArrow from "@/lib/assets/icons/DownArrow";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import styles from "./page.module.css";

const hobbiesSlideText = [
  [
    "Coffee",
    "Coffee is one of my greatest passions. I enjoy exploring various brewing methods and flavors, finding it meditative and creative. My love for coffee has also taught me the importance of patience, attention to detail, and creativity.",
  ],
  [
    "Photography",
    "Photography is a hobby that I am very passionate about. I enjoy capturing beautiful moments, landscapes, and objects through the lens of a camera. It allows me to express my creativity and perspective, and the process of composing a shot is both challenging and rewarding.",
  ],
  [
    "Woodworking",
    "Woodworking is a hobby that I am deeply passionate about. I find joy in creating functional and beautiful pieces using my hands and imagination. It allows me to express my creativity and has taught me the importance of patience, attention to detail, and problem-solving skills.",
  ],
  [
    "Cycling",
    "Cycling is a hobby that I thoroughly enjoy. I find it to be a great way to stay active, explore new places, and clear my mind.",
  ],
];

// The only interactive part of the About page. Keeping it isolated lets the
// page itself stay a Server Component, which is what allows it to export
// metadata and to render the (now server-side) Selected Projects grid.
export default function HobbiesCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <>
      {/* Slides are hidden only by overflow, so without carousel semantics a
          screen reader reads all four hobbies as one continuous block. */}
      <div
        className={styles.embla}
        ref={emblaRef}
        role="group"
        aria-roledescription="carousel"
        aria-label="Hobbies"
      >
        <div className={styles.embla__container}>
          {hobbiesSlideText.map((content, index) => (
            <div
              className={styles.embla__slide}
              key={index}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${hobbiesSlideText.length}: ${content[0]}`}
            >
              <h3 className="smallGrayHeading">{content[0]}</h3>
              <p>{content[1]}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Both buttons contained only an unlabelled SVG, so each announced as
          just "button" — indistinguishable from the other. */}
      <button
        type="button"
        className={styles.embla__prev}
        onClick={scrollPrev}
        aria-label="Previous hobby"
      >
        <DownArrow />
      </button>
      <button
        type="button"
        className={styles.embla__next}
        onClick={scrollNext}
        aria-label="Next hobby"
      >
        <DownArrow />
      </button>
    </>
  );
}
