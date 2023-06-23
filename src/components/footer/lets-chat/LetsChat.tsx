import ButtonUnderline from "@/components/buttons/underlineButton/ButtonUnderLine";
import { FC } from "react";
import styles from "./LetsChat.module.css";

interface LetsChatProps {}

const LetsChat: FC<LetsChatProps> = () => {
  return (
    <div className={styles.container}>
      <h4>Let&apos;s Chat!</h4>
      <p>Let&apos;s have a chat over a cup of coffee.</p>
      <ButtonUnderline link={"./contact"}>Get in touch</ButtonUnderline>
    </div>
  );
};

export default LetsChat;
