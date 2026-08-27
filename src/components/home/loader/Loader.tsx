"use client";

import { gsap } from "gsap";
import { FC, useEffect, useRef } from "react";
import {
  COLLAPSE_OFFSET,
  collapseWords,
  introAnimation,
  progressAnimation,
} from "./Animations";
import { words } from "./Data";
import styles from "./Loader.module.css";

interface LoaderProps {
  onFinish: () => void;
}

const Loader: FC<LoaderProps> = ({ onFinish }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressNumberRef = useRef<HTMLSpanElement>(null);
  const wordGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Build the timeline with its children already attached. Previously an
    // empty timeline was created with onComplete already armed and populated
    // afterwards, so completion could fire before the animation existed.
    const context = gsap.context(() => {
      gsap
        .timeline({ onComplete: onFinish })
        .add(introAnimation(wordGroupRef))
        .add(progressAnimation(progressRef, progressNumberRef), 0)
        .add(collapseWords(loaderRef), COLLAPSE_OFFSET);
    }, rootRef);

    return () => context.revert();
  }, [onFinish]);

  return (
    <div className={styles.wrapper} ref={rootRef} data-loader-overlay>
      {/* First thing in the overlay's tab order: the page behind is already
          rendered, so anyone can dismiss this and get straight to it. */}
      <button type="button" className={styles.skip} onClick={onFinish}>
        Skip intro
      </button>

      <div className={styles.progressWrapper} aria-hidden="true">
        <div className={styles.progress} ref={progressRef} />
        <span className={styles.progressNumber} ref={progressNumberRef}>
          0
        </span>
      </div>

      {/* Decorative: the words carry no meaning and would otherwise be read
          out ahead of the real page content sitting behind the overlay. */}
      <div className={styles.loader} ref={loaderRef} aria-hidden="true">
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
