import { FC } from "react";
import styles from "./SquareButton.module.css";

interface SquareButtonProps {
  buttonStyle: "filled" | "outline";
  disabled?: boolean;
  type: "submit" | "reset" | "button";
  children: any;
}

const SquareButton: FC<SquareButtonProps> = ({
  buttonStyle,
  disabled = false,
  type,
  children,
}) => {
  return (
    <button
      className={`${styles.button} ${buttonStyle === "filled" && styles.filled}
      ${buttonStyle === "outline" && styles.outline}`}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default SquareButton;
