import ButtonUnderline from "@/components/button/ButtonUnderLine";
import { FC } from "react";

interface LetsChatProps {}

const LetsChat: FC<LetsChatProps> = () => {
  return (
    <div>
      <h4>Let&apos;s Chat!</h4>
      <p>Let&apos;s have a chat over a cup of coffee.</p>
      <ButtonUnderline link={"./contact"}>Get in touch</ButtonUnderline>
    </div>
  );
};

export default LetsChat;
