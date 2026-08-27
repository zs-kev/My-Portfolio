import { SOCIAL_LINKS } from "@/lib/siteConfig";
import { FC } from "react";
import styles from "./Socials.module.css";

interface SocialsProps {}

const Socials: FC<SocialsProps> = () => {
  return (
    <div className={styles.container}>
      {SOCIAL_LINKS.map(({ label, href }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      ))}
    </div>
  );
};

export default Socials;
