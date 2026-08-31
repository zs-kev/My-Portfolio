import styles from "./ScrollCue.module.css";

export interface ScrollCueProps {
  label?: string;
  className?: string;
}

// The scroll prompt from both heroes: a small rotated label above a vertical
// rule, with a highlight travelling down the rule. The rule and the highlight
// are one element — see the module for why that matters in Safari.
//
// It is decorative and aria-hidden. The page scrolls identically without it, so
// announcing "Scroll down" to a screen reader would be an instruction the
// reader has no use for. It is also markup-only — no JS, no entrance animation
// to wait on — which matches the social rail it sits above on the home page and
// means it survives with scripting off.
const ScrollCue: React.FC<ScrollCueProps> = ({
  label = "Scroll down",
  className,
}) => {
  return (
    <div
      className={`${styles.cue} ${className ?? ""}`.trim()}
      aria-hidden="true"
    >
      <span className={styles.label}>{label}</span>
      <span className={styles.track} />
    </div>
  );
};

export default ScrollCue;
