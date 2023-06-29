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
  let themeClass = currentTheme;

  const handleClick = () => {
    if (currentTheme === "dark") {
      setTheme("light");
      themeClass = "light";
    } else {
      setTheme("dark");
      themeClass = "dark";
    }
  };

  return (
    <motion.div
      variants={variants}
      initial={"closed"}
      animate={isNavOpen ? "open" : "closed"}
      exit={"closed"}
    >
      <button onClick={handleClick} className={styles.button}>
        <p>Light</p>
        <div
          className={`${styles.circle} three-trans ${
            themeClass === "dark" ? styles.darkCircle : styles.lightCircle
          }`}
        ></div>
        <div
          className={`${styles.line} ${
            themeClass === "dark" ? styles.lineDark : styles.lineLight
          }`}
        ></div>
        <p>Dark</p>
      </button>
    </motion.div>
  );
};

export default ThemeToggle;
