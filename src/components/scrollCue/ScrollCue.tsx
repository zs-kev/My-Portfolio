import MouseScroll from "@/lib/assets/icons/MouseScroll";
import styles from "./ScrollCue.module.css";

export interface ScrollCueProps {
  label?: string;
  // The case study hero pairs the label with a mouse riding the line; the home
  // rail is label and rule only, as in the design.
  mouse?: boolean;
  className?: string;
}

// The scroll prompt from both heroes in the design: a small rotated label above
// a vertical rule. On the case study the mouse sits on that rule and travels
// down it and back, the way you would push a mouse to scroll. Where there is no
// mouse, a highlight travels the rule instead.
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
      <span className={styles.label}>{label}</span>
      <span className={styles.rail}>
        <span className={styles.line}>
          {!mouse && <span className={styles.travel} />}
        </span>
        {mouse && (
          <span className={styles.mouse}>
            <MouseScroll />
          </span>
        )}
      </span>
    </div>
  );
};

export default ScrollCue;
