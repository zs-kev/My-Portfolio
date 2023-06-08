"use client";

import { LightDarkLoader } from "@/components/contentLoader";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

export interface ThemeToggleProps {}

const ThemeToggle: React.FC<ThemeToggleProps> = () => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="self-start">
        <LightDarkLoader />
      </div>
    );
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
    <div>
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
    </div>
  );
};

export default ThemeToggle;
