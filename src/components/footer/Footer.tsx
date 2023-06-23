import Logo from "../logo/Logo";
import LetsChat from "./lets-chat/LetsChat";
import Socials from "./socials/Socials";

export interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer>
      <Logo copywrite={true} />
      <Socials />
      <LetsChat />
    </footer>
  );
};

export default Footer;
