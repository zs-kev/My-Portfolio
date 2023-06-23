"use client";

import Logo from "../logo/Logo";
import styles from "./Header.module.css";
import Navigation from "./navigation/Navigation";
import ThemeToggle from "./themeToggle/ThemeToggle";

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className={styles.header}>
      <Logo copywrite={false} />
      <div className={styles.navWrapper}>
        <Navigation />
      </div>
      <div className={styles.toggleWrapper}>
        <ThemeToggle />
      </div>

      <div className={styles.hamburger}>
        <div className={styles.topLine}></div>
        <div className={styles.middleLine}></div>
        <div className={styles.bottomLine}></div>
      </div>
    </header>
  );
};

export default Header;
