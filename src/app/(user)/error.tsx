"use client";

import ButtonUnderline from "@/components/buttons/underlineButton/ButtonUnderLine";
import { useEffect } from "react";
import styles from "./statusPage.module.css";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surfaced in the server logs / browser console. The digest is what ties a
    // production error back to a specific stack trace.
    console.error(error);
  }, [error]);

  return (
    <section className={`max-width-wrapper ${styles.wrapper}`}>
      <p className={styles.code}>Something went wrong</p>
      <h1>That didn&apos;t load</h1>
      <p className={styles.body}>
        Something broke on my end rather than yours. Trying again often clears
        it.
      </p>
      <div className={styles.links}>
        <button type="button" className={styles.retry} onClick={reset}>
          Try again
        </button>
      </div>
      <div className={styles.links}>
        <ButtonUnderline link={"/portfolio"}>See the work</ButtonUnderline>
        <ButtonUnderline link={"/"}>Back home</ButtonUnderline>
      </div>
    </section>
  );
}
