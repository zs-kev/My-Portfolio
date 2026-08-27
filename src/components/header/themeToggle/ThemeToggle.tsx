"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.6,
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export interface ThemeToggleProps {
  isNavOpen?: Boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isNavOpen = true }) => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div />;
  }

  const currentTheme = theme === "system" ? systemTheme : theme;

  const handleClick = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <motion.div
      variants={variants}
      initial={"closed"}
      animate={isNavOpen ? "open" : "closed"}
      exit={"closed"}
    >
      {/* Announced as "Light Dark" with no indication of purpose or state.
          role="switch" + aria-checked gives it both. */}
      <button
        type="button"
        onClick={handleClick}
        className={styles.button}
        role="switch"
        aria-checked={currentTheme === "dark"}
        aria-label="Dark mode"
      >
        <span aria-hidden="true">Light</span>
        <div
          className={`${styles.circle} three-trans ${
            currentTheme === "dark" ? styles.darkCircle : styles.lightCircle
          }`}
        ></div>
        <div
          className={`${styles.line} ${
            currentTheme === "dark" ? styles.lineDark : styles.lineLight
          }`}
        ></div>
        <span aria-hidden="true">Dark</span>
      </button>
    </motion.div>
  );
};

export default ThemeToggle;
