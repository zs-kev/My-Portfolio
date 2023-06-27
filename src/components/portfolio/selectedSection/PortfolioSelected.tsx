import ButtonUnderline from "@/components/buttons/underlineButton/ButtonUnderLine";
import Image from "next/image";
import Link from "next/link";
import styles from "./PortfolioSelected.module.css";

export interface PortfolioSelectedProps {}

const PortfolioSelected: React.FC<PortfolioSelectedProps> = () => {
  return (
    <section className="max-width-wrapper">
      <div>
        <div className={styles.container}>
          <div className={styles.firstItem}>
            <div className={styles.introText}>
              <h2>Selected Projects</h2>
              <p>
                I do everything with my core values of honesty, hard work, and
                trust.
              </p>
            </div>
          </div>
          <Link className={styles.secondItem} href={""}>
            <div className={styles.logoItem}>
              <Image
                src="/assets/images/logos/axio-logo-white.svg"
                alt="axio connect Project Logo"
                width="0"
                height="0"
                className={styles.image}
              />
              {/* <div className="bg-[#3E3E3E] absolute w-full h-full -translate-x-full"></div> */}
            </div>
          </Link>
          <Link className={styles.thirdItem} href={""}>
            <div className={styles.logoItem}></div>
          </Link>
          <Link className={styles.fourthItem} href={""}>
            <div className={styles.logoItem}>
              <Image
                src="/assets/images/logos/huddle-logo-white.svg"
                alt="Huddle Project Logo"
                width="0"
                height="0"
                className={styles.image}
              />
              <div className="third-cover"></div>
            </div>
          </Link>
          <div className={styles.fifthItem}>
            <div className={styles.testimonial}>
              <h3>What they saying</h3>
              <p className={styles.quote}>
                &quot;Great person to work with! Did the job faster than the
                initial due date, great service and great communication. Thank
                You!&quot;
              </p>
              <p>Mabel Jones</p>
            </div>
          </div>
          <Link className={styles.sixthItem} href={""}>
            <div className={styles.logoItem}></div>
          </Link>
          <Link className={styles.seventhItem} href={""}>
            <div className={styles.logoItem}></div>
          </Link>
          <div className={styles.eightItem}>
            <ButtonUnderline link={"/portfolio"}>
              See all projects
            </ButtonUnderline>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSelected;
