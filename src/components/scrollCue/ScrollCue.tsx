import MouseScroll from "@/lib/assets/icons/MouseScroll";
import styles from "./ScrollCue.module.css";

export interface ScrollCueProps {
  label?: string;
  // The case study hero pairs the label with a mouse; the home rail is text and
  // rule only, as in the design.
  mouse?: boolean;
  className?: string;
}

// The scroll prompt from both heroes in the design: a small rotated label and a
// rule whose highlight travels down it.
//
// It is decorative and aria-hidden. The page scrolls identically without it, so
// announcing "Scroll" to a screen reader would be an instruction the reader has
// no use for. It is also markup-only — no JS, no entrance animation to wait on —
// which matches the social rail it sits above and means it survives with
// scripting off.
const ScrollCue: React.FC<ScrollCueProps> = ({
  label = "Scroll",
  mouse = false,
  className,
}) => {
  return (
    <div
      className={`${styles.cue} ${className ?? ""}`.trim()}
      aria-hidden="true"
    >
      {mouse && (
        <span className={styles.mouse}>
          <MouseScroll />
        </span>
      )}
      <span className={styles.label}>{label}</span>
      <span className={styles.track}>
        <span className={styles.travel} />
      </span>
    </div>
  );
};

export default ScrollCue;
