import { FC } from "react";

interface MouseScrollProps {}

// The mouse outline from the case study hero in the design. The body takes the
// current text colour so it themes with everything around it; the wheel keeps
// the site gradient, the same pink-to-pumpkin used by the link underlines and
// the hero name.
const MouseScroll: FC<MouseScrollProps> = () => {
  return (
    <svg
      width="20"
      height="30"
      viewBox="0 0 20 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.75"
        y="0.75"
        width="18.5"
        height="28.5"
        rx="9.25"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="8.5"
        y="6.5"
        width="3"
        height="7"
        rx="1.5"
        fill="url(#mouseScrollWheel)"
      />
      <defs>
        <linearGradient
          id="mouseScrollWheel"
          x1="10"
          y1="6.5"
          x2="10"
          y2="13.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EE0979" />
          <stop offset="1" stopColor="#FF6A00" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default MouseScroll;
