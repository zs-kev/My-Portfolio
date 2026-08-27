"use client";

import { useIntroFinished } from "@/lib/providers/LoaderProvider/ProviderLoader";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Logo from "../logo/Logo";
import styles from "./Header.module.css";
import Navigation from "./navigation/Navigation";
import ThemeToggle from "./themeToggle/ThemeToggle";

export interface HeaderProps {}

const variants = {
  backgroundOpen: {
    height: "100vh",
    transition: {
      ease: "easeInOut",
      duration: 1,
    },
  },
  backgroundClose: {
    height: "0vh",
    transition: {
      ease: "easeInOut",
      duration: 1,
    },
  },
};

const variantsBurger = {
  topLineOpen: {
    rotate: 45,
    y: 5,
    transition: {
      duration: 0.5,
    },
  },
  topLineClose: {
    rotate: 0,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  bottomLineOpen: {
    rotate: -45,
    y: -5,
    transition: {
      duration: 0.5,
    },
  },
  bottomLineClose: {
    rotate: 0,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  middleLineOpen: {
    opacity: 0,
    x: "100%",
    transition: {
      duration: 0.5,
    },
  },
  middleLineClose: {
    opacity: 1,
    x: "0%",
    transition: {
      duration: 0.5,
    },
  },
};

const Header: React.FC<HeaderProps> = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  // Both default to isNavOpen=true, so on desktop they animate in on mount —
  // which now means behind the loader. Hold them until the intro is done.
  const introFinished = useIntroFinished();

  const handleNavClick = () => {
    setIsNavOpen((isOpen) => !isOpen);
  };

  return (
    <>
      <header>
        <div className={styles.header}>
          <Logo copywrite={false} />
          <div className={styles.navWrapper}>
            <Navigation isNavOpen={introFinished} />
          </div>
          <div className={styles.toggleWrapper}>
            <ThemeToggle isNavOpen={introFinished} />
          </div>
        </div>

        {/* ------ Header mobile ------ */}
        <div className={`${styles.header} ${styles.headerMobile}`}>
          <Logo copywrite={false} />
          <div className={styles.hamburger} onClick={handleNavClick}>
            <motion.div
              className={styles.topLine}
              variants={variantsBurger}
              initial={"topLineClose"}
              animate={isNavOpen ? "topLineOpen" : "topLineClose"}
              exit={"topLineClose"}
            ></motion.div>
            <motion.div
              className={styles.middleLine}
              variants={variantsBurger}
              initial={"middleLineClose"}
              animate={isNavOpen ? "middleLineOpen" : "middleLineClose"}
              exit={"middleLineClose"}
            ></motion.div>
            <motion.div
              className={styles.bottomLine}
              variants={variantsBurger}
              initial={"bottomLineClose"}
              animate={isNavOpen ? "bottomLineOpen" : "bottomLineClose"}
              exit={"bottomLineClose"}
            ></motion.div>
          </div>
          <AnimatePresence>
            {isNavOpen && (
              <div className={styles.nav}>
                <div
                  className={`${styles.navWrapper} ${styles.navWrapperMobile}`}
                >
                  <Navigation
                    handleNavClick={handleNavClick}
                    isNavOpen={isNavOpen}
                  />
                </div>
                <div
                  className={`${styles.toggleWrapper} ${styles.toggleWrapperMobile}`}
                >
                  <ThemeToggle isNavOpen={isNavOpen} />
                </div>
                <motion.div
                  className={styles.background}
                  variants={variants}
                  initial={"backgroundClose"}
                  animate={isNavOpen ? "backgroundOpen" : "backgroundClose"}
                  exit={"backgroundClose"}
                ></motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
};

export default Header;
