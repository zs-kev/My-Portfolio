"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navigation.module.css";

const pagesArr: { page: string; path: string }[] = [
  { page: "Home", path: "/" },
  { page: "About", path: "/about" },
  { page: "Portfolio", path: "/portfolio" },
  { page: "Articles", path: "/portfolio" },
  { page: "Contact", path: "/contact" },
];

export interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = () => {
  const currentRoute = usePathname();

  return (
    <nav className={styles.nav}>
      {pagesArr.map(({ page, path }) => (
        <Link
          key={page}
          href={path}
          className={`${styles.navLink} ${
            currentRoute === path && styles.active
          }`}
        >
          {page}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
