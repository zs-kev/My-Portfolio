import Image from "next/image";
import Link from "next/link";
import styles from "./HomeHero.module.css";

export interface HomeHeroProps {}

const HomeHero: React.FC<HomeHeroProps> = () => {
  return (
    <section className={styles.section}>
      <div className={styles.gridContainer}>
        <p className={styles.hello}>Hello, I am</p>
        <h1 className={`headingSpecial ${styles.h1}`}>Kevin</h1>
        <h2 className={`headingSpecial ${styles.h2}`}>Simon</h2>
        <div className={styles.flexContainer}>
          <div>
            <p>
              I am an aspiring full-stack developer based in South Africa. With
              a growing expertise in front-end and back-end technologies.
            </p>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Link href={"#about-home"}>
            <span>Let&apos;s Meet</span>
          </Link>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src={"/assets/images/kevin-simon.png"}
            alt={"Kevin Simon Portrait"}
            priority
            width="0"
            height="0"
            sizes="100vw"
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.backgroundBlur}></div>
    </section>
  );
};

export default HomeHero;
