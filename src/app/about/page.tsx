import TechStack from "@/components/about/techStack/TechStack";
import PortfolioSelected from "@/components/portfolio/selectedSection/PortfolioSelected";
import styles from "./page.module.css";

export default function About() {
  return (
    <>
      <section className={styles.heroContainer}>
        <div>
          <h1 className="headingSpecial">About Me</h1>
          {/* <Image
            src={"/assets/images/kevin-simon.png"}
            alt={"Kevin Simon Portrait"}
            priority
            width="0"
            height="0"
            sizes="100vw"
            className={styles.image}
          /> */}
        </div>
        <p>
          Hello! I&apos;m Kevin Simon, an enthusiastic full-stack developer
          based in Johannesburg, South Africa. I have a relentless drive for
          learning and a focus on crafting captivating web experiences.
        </p>
      </section>

      <div className={styles.background}>
        <TechStack>My Skills</TechStack>
        <section className="max-width-wrapper"></section>
      </div>

      <section className={`max-width-wrapper ${styles.moreInfo}`}>
        <div className={styles.infoWrapper}>
          <h2>Hobbies</h2>
        </div>
        <div className={styles.infoWrapper}>
          <h2>A little more about me</h2>
          <p>
            I am a self-taught developer with a deep passion for website
            development and the art of creating beautiful, engaging online
            experiences. Starting with a blank code editor and watching a
            project come to life while honing my skills brings me immense joy.
            While I appreciate all aspects of web development, my true passion
            lies in front-end development, particularly with React and Next.js.
            I thrive on crafting seamless user interfaces and bringing designs
            to life with interactive elements.
          </p>
        </div>
      </section>

      <PortfolioSelected />
    </>
  );
}
