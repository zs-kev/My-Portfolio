import { TechStackIcons } from "@/lib/assets/icons/TechStackIcons";
import { FC } from "react";
import styles from "./TechStack.module.css";

interface TechStackProps {}

const TechStack: FC<TechStackProps> = () => {
  return (
    <div className={styles.container}>
      <TechStackIcons.htmlFive />
      <TechStackIcons.cssThree />
      <TechStackIcons.sass />
      <TechStackIcons.javascript />
      <TechStackIcons.react />
      <TechStackIcons.next />
    </div>
  );
};

export default TechStack;
