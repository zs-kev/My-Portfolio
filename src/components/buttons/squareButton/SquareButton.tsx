import { FC } from "react";
import styles from "./SquareButton.module.css";

interface SquareButtonProps {
  buttonStyle: "filled" | "outline";
  disabled?: boolean;
  children: any;
}

const SquareButton: FC<SquareButtonProps> = ({
  buttonStyle,
  disabled = false,
  children,
}) => {
  return (
    <button
      className={`${styles.button} ${buttonStyle === "filled" && styles.filled}
      ${buttonStyle === "outline" && styles.outline}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default SquareButton;
