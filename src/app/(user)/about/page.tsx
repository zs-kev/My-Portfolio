import TechStack from "@/components/about/techStack/TechStack";
import PortfolioSelected from "@/components/portfolio/selectedSection/PortfolioSelected";
import Image from "next/image";
import HobbiesCarousel from "./HobbiesCarousel";
import styles from "./page.module.css";

export const metadata = {
  title: "About",
  description:
    "Kevin Simon is a self-taught full-stack developer in Johannesburg, South Africa. Front-end work with React and Next.js, built on honesty, hard work and trust.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", title: "About" },
};

export default function About() {
  return (
    <>
      <section className={styles.heroContainer}>
        <div>
          <h1 className="headingSpecial">About Me</h1>
        </div>
        <p>
          Hello! I&apos;m Kevin Simon, an enthusiastic full-stack developer
          based in Johannesburg, South Africa. I have a relentless drive for
          learning and a focus on crafting captivating web experiences.
        </p>
      </section>

      <div className={styles.background}>
        <TechStack>My Skills</TechStack>

        <section className={`max-width-wrapper ${styles.expSection}`}>
          <h2>Experience</h2>
          <div className={styles.experience}>
            <div className={styles.experienceImg}>
              <Image
                src={"/assets/images/logos/fusebox.png"}
                alt="Fusebox Online"
                width={153}
                height={35}
              />
            </div>
            <div className={styles.experienceText}>
              <p className="smallGrayHeading">Feb 2020 - March 2021</p>
              <h3>Intern at FuseBox Online</h3>
              <div>
                <p>
                  My position involved working with various programming
                  languages. Specifically, I worked with HTML, CSS/SASS, and
                  JavaScript on frontend projects, and PHP and Laravel on the
                  backend.
                </p>
                <p>
                  As I progressed, I was entrusted with more responsibilities
                  and began working alongside senior developers on both frontend
                  and backend tasks.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className={`max-width-wrapper ${styles.moreInfo}`}>
        <div className={styles.infoWrapper}>
          <h2>Hobbies</h2>
          <HobbiesCarousel />
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
