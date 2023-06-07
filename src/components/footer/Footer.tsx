import Logo from "../logo/Logo";

export interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return <Logo copywrite={true} />;
};

export default Footer;
