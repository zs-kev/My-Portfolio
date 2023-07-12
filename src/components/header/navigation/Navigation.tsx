"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navigation.module.css";

const pagesArr: { page: string; path: string }[] = [
  { page: "Home", path: "/" },
  { page: "About", path: "/about" },
  { page: "Portfolio", path: "/portfolio" },
  { page: "Contact", path: "/contact" },
];

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const variantsItems = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
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

export interface NavigationProps {
  handleNavClick?: () => void;
  isNavOpen?: Boolean;
}

const Navigation: React.FC<NavigationProps> = ({
  handleNavClick,
  isNavOpen = true,
}) => {
  const currentRoute = usePathname();

  return (
    <motion.nav
      className={styles.nav}
      variants={variants}
      initial={"closed"}
      animate={isNavOpen ? "open" : "closed"}
      exit={"closed"}
    >
      {pagesArr.map(({ page, path }) => (
        <motion.div key={page} variants={variantsItems}>
          <Link
            onClick={handleNavClick}
            href={path}
            className={`${styles.navLink} ${
              currentRoute === path && styles.active
            }`}
          >
            {page}
          </Link>
        </motion.div>
      ))}
    </motion.nav>
  );
};

export default Navigation;
