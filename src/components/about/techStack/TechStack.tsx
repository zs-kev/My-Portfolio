import { TechStackIcons } from "@/lib/assets/icons/TechStackIcons";
import { FC } from "react";
import styles from "./TechStack.module.css";

interface TechStackProps {
  children: string;
  skills?: Boolean;
  stack?: Boolean;
}

const TechStack: FC<TechStackProps> = ({
  children,
  skills = true,
  stack = true,
}) => {
  return (
    <section className={`${styles.skills} max-width-wrapper`}>
      <div>
        <h2>{children}</h2>
        {skills && (
          <ul className={styles.list}>
            <li>User Interface Design</li>
            <li>Responsive Design</li>
            <li>Front-End Website Development</li>
            <li>Back-End Website Development</li>
            <li>Full-Stack Development</li>
            <li>Search Engine Optimisation</li>
          </ul>
        )}
      </div>
      {stack && (
        <div className={styles.container}>
          <TechStackIcons.htmlFive />
          <TechStackIcons.cssThree />
          <TechStackIcons.sass />
          <TechStackIcons.javascript />
          <TechStackIcons.react />
          <TechStackIcons.next />
        </div>
      )}
    </section>
  );
};

export default TechStack;
