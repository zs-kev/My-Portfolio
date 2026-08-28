"use client";

import { useIntroFinished } from "@/lib/providers/LoaderProvider/ProviderLoader";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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

// Anything that can hold focus inside the panel. Nav links and the theme
// toggle today; querying by role rather than listing components means the trap
// keeps working if the panel gains something new.
const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const Header: React.FC<HeaderProps> = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  // Both default to isNavOpen=true, so on desktop they animate in on mount —
  // which now means behind the loader. Hold them until the intro is done.
  const introFinished = useIntroFinished();

  const panelRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const handleNavClick = () => {
    setIsNavOpen((isOpen) => !isOpen);
  };

  // Dismissing the menu without choosing a destination returns focus to the
  // control that opened it. Following a link does not — focus belongs with the
  // page you asked for.
  const dismissNav = () => {
    setIsNavOpen(false);
    hamburgerRef.current?.focus();
  };

  // The open menu is a full-screen overlay, so it has to behave like one:
  // Escape closes it, Tab cycles within it instead of walking the page behind
  // it, and the page behind it does not scroll. Without this, tabbing from the
  // menu moved focus to links the visitor could not see.
  useEffect(() => {
    if (!isNavOpen) return;

    const panel = panelRef.current;
    if (!panel) return;

    const panelItems = () =>
      Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));

    // The hamburger is this panel's Close button — it is what carries
    // aria-label="Close menu" — but it sits outside the panel in the DOM, so
    // querying the panel alone trapped focus in a cycle that could never reach
    // it. Keyboard users could open the menu and never tab to the control that
    // closes it.
    const cycle = () => {
      const burger = hamburgerRef.current;
      const items = panelItems();
      return burger ? [burger, ...items] : items;
    };

    // Focus still starts on the first link rather than the Close button: the
    // point of opening the menu is to choose a destination.
    panelItems()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dismissNav();
        return;
      }

      if (event.key !== "Tab") return;

      const items = cycle();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      // Only the two edges need handling; everything between them is the
      // browser's own tab order.
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    // The panel is hidden by CSS at 62rem and up, but isNavOpen is React state
    // and knows nothing about that. Crossing the breakpoint with the menu open
    // therefore left the body scroll-locked with no visible menu to close —
    // the page simply stopped scrolling. Closing on the change keeps the two
    // in step.
    const desktop = window.matchMedia("(min-width: 62rem)");
    const onBreakpointChange = () => {
      if (desktop.matches) dismissNav();
    };
    onBreakpointChange();
    desktop.addEventListener("change", onBreakpointChange);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      desktop.removeEventListener("change", onBreakpointChange);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isNavOpen]);

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
          <button
            type="button"
            className={styles.hamburger}
            ref={hamburgerRef}
            onClick={handleNavClick}
            aria-label={isNavOpen ? "Close menu" : "Open menu"}
            aria-expanded={isNavOpen}
            aria-controls="mobile-nav"
          >
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
          </button>
          <AnimatePresence>
            {isNavOpen && (
              <div className={styles.nav} id="mobile-nav" ref={panelRef}>
                <div
                  className={`${styles.navWrapper} ${styles.navWrapperMobile}`}
                >
                  <Navigation
                    handleNavClick={() => setIsNavOpen(false)}
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
