"use client";

import TechStack from "@/components/about/techStack/TechStack";
import PortfolioSelected from "@/components/portfolio/selectedSection/PortfolioSelected";
import DownArrow from "@/lib/assets/icons/DownArrow";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useState } from "react";
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

const varientsHobby = {
  initial: (direction: number) => {
    return {
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    };
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "circInOut" },
    },
  },
  exit: (direction: number) => {
    return {
      x: direction > 0 ? -200 : 200,
      opacity: 0,
    };
  },
};

export default function About() {
  const [hobbyIndex, setHobbyIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextStep = () => {
    setDirection(1);

    if (hobbyIndex === hobbiesSlideText.length - 1) {
      setHobbyIndex(0);
      return;
    }

    setHobbyIndex(hobbyIndex + 1);
  };

  const prevStep = () => {
    setDirection(-1);

    if (hobbyIndex === 0) {
      setHobbyIndex(hobbiesSlideText.length - 1);
      return;
    }

    setHobbyIndex(hobbyIndex - 1);
  };

  return (
    <>
      <section className={styles.heroContainer}>
        <div>
          <h1 className="headingSpecial">About Me</h1>
          {/* <Image
            src={"/assets/images/kevin-simon.png"}
            alt={"Kevin Simon Portrait"}
            priority
            width="0"
            height="0"
            sizes="100vw"
            className={styles.image}
          /> */}
        </div>
        <p>
          Hello! I&apos;m Kevin Simon, an enthusiastic full-stack developer
          based in Johannesburg, South Africa. I have a relentless drive for
          learning and a focus on crafting captivating web experiences.
        </p>
      </section>

      <div className={styles.background}>
        <TechStack>My Skills</TechStack>
        <section className="max-width-wrapper"></section>
      </div>

      <section className={`max-width-wrapper ${styles.moreInfo}`}>
        <div className={styles.infoWrapper}>
          <h2>Hobbies</h2>
          <div className={styles.textSlideContainer}>
            <div className={styles.textSlideShow}>
              <AnimatePresence initial={false} custom={direction}>
                <LayoutGroup>
                  <motion.div
                    variants={varientsHobby}
                    animate="animate"
                    initial="initial"
                    exit="exit"
                    className={styles.textSlides}
                    key={hobbyIndex}
                    custom={direction}
                  >
                    <h3>{hobbiesSlideText[hobbyIndex][0]}</h3>
                    <p>{hobbiesSlideText[hobbyIndex][1]}</p>
                  </motion.div>
                </LayoutGroup>
              </AnimatePresence>
              <button className={styles.prevBtn} onClick={prevStep}>
                <DownArrow />
              </button>
              <button className={styles.nextBtn} onClick={nextStep}>
                <DownArrow />
              </button>
            </div>
          </div>
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
