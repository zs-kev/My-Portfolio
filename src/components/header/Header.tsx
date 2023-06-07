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
      <Navigation />
      <ThemeToggle />
    </header>
  );
};

export default Header;
