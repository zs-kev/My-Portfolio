"use client";

import { FC, useEffect, useRef } from "react";
import { words } from "./Data";
import styles from "./Loader.module.css";

import { collapseWords, introAnimation, progressAnimation } from "./Animations";

interface LoaderProps {
  timeline: any;
}

const Loader: FC<LoaderProps> = ({ timeline }) => {
  const loaderRef = useRef(null);
  const progressRef = useRef(null);
  const progressNumberRef = useRef(null);
  const wordGroupRef = useRef(null);

  useEffect(() => {
    timeline &&
      timeline
        .add(introAnimation(wordGroupRef))
        .add(progressAnimation(progressRef, progressNumberRef), 0)
        .add(collapseWords(loaderRef), "-=1");
  }, [timeline]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.progressWrapper}>
        <div className={styles.progress} ref={progressRef} />
        <span className={styles.progressNumber} ref={progressNumberRef}>
          0
        </span>
      </div>
      <div className={styles.loader} ref={loaderRef}>
        <div className={styles.words}>
          <div className={styles.overlay} />
          <div className={styles.wordsGroup} ref={wordGroupRef}>
            {words.map((word, index) => {
              return (
                <span key={index} className={styles.word}>
                  {word}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
