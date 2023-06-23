import Link from "next/link";
import { FC } from "react";
import styles from "./ButtonUnderline.module.css";

interface ButtonUnderlineProps {
  link: String;
  children: any;
}

const ButtonUnderline: FC<ButtonUnderlineProps> = ({ link, children }) => {
  return (
    <Link href={`${link}`} className={styles.link}>
      {children}
      <div className={`${styles.underline} three-trans`}></div>
    </Link>
  );
};

export default ButtonUnderline;
