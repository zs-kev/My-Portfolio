import ButtonUnderline from "@/components/buttons/underlineButton/ButtonUnderLine";
import styles from "./statusPage.module.css";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className={`max-width-wrapper ${styles.wrapper}`}>
      <p className={styles.code}>Error 404</p>
      <h1>This page doesn&apos;t exist</h1>
      <p className={styles.body}>
        The link may be out of date, or the project may have moved. Everything
        I&apos;ve worked on is still one click away.
      </p>
      <div className={styles.links}>
        <ButtonUnderline link={"/portfolio"}>See the work</ButtonUnderline>
        <ButtonUnderline link={"/"}>Back home</ButtonUnderline>
      </div>
    </section>
  );
}
