import { FC } from "react";
import styles from "./Socials.module.css";

interface SocialsProps {}

const Socials: FC<SocialsProps> = () => {
  return (
    <div className={styles.container}>
      <a
        href={"https://www.linkedin.com/in/kevin-simon-dev/"}
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
      <a
        href={"https://github.com/zs-kev"}
        target="_blank"
        rel="noopener noreferrer"
      >
        Github
      </a>
      <a
        href={"https://www.frontendmentor.io/profile/zs-kev"}
        target="_blank"
        rel="noopener noreferrer"
      >
        FrontendMentor
      </a>
      <a
        href={"https://instagram.com/kevin_coffeecycles"}
        target="_blank"
        rel="noopener noreferrer"
      >
        Instagram
      </a>
    </div>
  );
};

export default Socials;
