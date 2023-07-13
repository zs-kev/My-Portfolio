"use client";

import TechStack from "@/components/about/techStack/TechStack";
import PortfolioSelected from "@/components/portfolio/selectedSection/PortfolioSelected";
import DownArrow from "@/lib/assets/icons/DownArrow";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
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

export default function About() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <>
      <section className={styles.heroContainer}>
        <div>
          <h1 className="headingSpecial">About Me</h1>
        </div>
        <p>
          Hello! I&apos;m Kevin Simon, an enthusiastic full-stack developer
          based in Johannesburg, South Africa. I have a relentless drive for
          learning and a focus on crafting captivating web experiences.
        </p>
      </section>

      <div className={styles.background}>
        <TechStack>My Skills</TechStack>

        <section className={`max-width-wrapper ${styles.expSection}`}>
          <h2>Experience</h2>
          <div className={styles.experience}>
            <div className={styles.experienceImg}>
              <Image
                src={"/assets/images/logos/fusebox.png"}
                alt="Fusebox Online"
                width={153}
                height={35}
              />
            </div>
            <div className={styles.experienceText}>
              <p className="smallGrayHeading">Feb 2020 - March 2021</p>
              <h3>Intern at FuseBox Online</h3>
              <div>
                <p>
                  My position involved working with various programming
                  languages. Specifically, I worked with HTML, CSS/SASS, and
                  JavaScript on frontend projects, and PHP and Laravel on the
                  backend.
                </p>
                <p>
                  As I progressed, I was entrusted with more responsibilities
                  and began working alongside senior developers on both frontend
                  and backend tasks.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className={`max-width-wrapper ${styles.moreInfo}`}>
        <div className={styles.infoWrapper}>
          <h2>Hobbies</h2>
          <div className={styles.embla} ref={emblaRef}>
            <div className={styles.embla__container}>
              {hobbiesSlideText.map((content, index) => (
                <div className={styles.embla__slide} key={index}>
                  <h3 className="smallGrayHeading">{content[0]}</h3>
                  <p>{content[1]}</p>
                </div>
              ))}
            </div>
          </div>
          <button className={styles.embla__prev} onClick={scrollPrev}>
            <DownArrow />
          </button>
          <button className={styles.embla__next} onClick={scrollNext}>
            <DownArrow />
          </button>
        </div>
        <div className={styles.infoWrapper}>
          <h2>A little more about me</h2>
          <p>
            I am a self-taught developer with a deep passion for website
            development and the art of creating beautiful, engaging online
            experiences. Starting with a blank code editor and watching a
            project come to life while honing my skills brings me immense joy.
            While I appreciate all aspects of web development, my true passion
            lies in front-end development, particularly with React and Next.js.
            I thrive on crafting seamless user interfaces and bringing designs
            to life with interactive elements.
          </p>
        </div>
      </section>

      <PortfolioSelected />
    </>
  );
}
