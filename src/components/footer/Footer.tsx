import Logo from "../logo/Logo";
import styles from "./Footer.module.css";
import LetsChat from "./lets-chat/LetsChat";
import Socials from "./socials/Socials";

export interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className={`${styles.footer} maxWidth`}>
      <div className={styles.line} />
      <div className={styles.wrapper}>
        <Logo copywrite={true} />
        <Socials />
        <LetsChat />
      </div>
    </footer>
  );
};

export default Footer;
