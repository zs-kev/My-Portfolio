import { PortfolioSelectedWork } from "@/components/portfolioSelected";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <section className={styles.heroSection}>
        <div className={styles.gridContainer}>
          <p className={styles.hello}>Hello, I am</p>
          <h1 className={`headingSpecial ${styles.h1}`}>Kevin</h1>
          <h2 className={`headingSpecial ${styles.h2}`}>Simon</h2>
          <div className={styles.flexContainer}>
            <div>
              <p>
                I am an aspiring full-stack developer based in South Africa.
                With a growing expertise in front-end and back-end technologies.
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
      <section id="about-home" className={styles.aboutSection}>
        <div className={styles.aboutWrapper}>
          <div className={styles.aboutContainer}>
            <p>
              I am a self-taught web developer based in vibrant Johannesburg,
              South Africa. With a deep passion for creating beautiful and
              engaging websites, I thrive on taking projects from a blank code
              editor and watching them grow alongside my skills.
            </p>
            <p>
              Front-end development with React and Next.js truly captivates me,
              but what drives me even more is the opportunity to infuse
              everything I do with my core values of honesty, hard work, and
              trust. With these values as my compass, I strive to deliver
              exceptional digital experiences that leave a lasting impact.
            </p>
            <div className={styles.aboutFlexContainer}>
              <Image
                src="/assets/images/kevin-simon-sig.svg"
                alt="Kevin Simon"
                width="0"
                height="0"
              />
              <div className="see-all">
                <a href="#">
                  About Me
                  <div></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <PortfolioSelectedWork />
      </section>
    </>
  );
}
