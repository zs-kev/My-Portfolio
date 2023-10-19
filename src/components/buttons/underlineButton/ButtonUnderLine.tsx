import Link from "next/link";
import { FC } from "react";
import styles from "./ButtonUnderline.module.css";

interface ButtonUnderlineProps {
  link: String;
  target?: any;
  children: any;
}

const ButtonUnderline: FC<ButtonUnderlineProps> = ({
  link,
  target,
  children,
}) => {
  return (
    <Link href={`${link}`} className={styles.link} target={target}>
      {children}
      <div className={`${styles.underline} three-trans`}></div>
    </Link>
  );
};

export default ButtonUnderline;
