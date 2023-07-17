import { ChangeEvent } from "react";
import styles from "./Input.module.css";

export interface InputProps {
  type: "text" | "number" | "email" | "password" | "tel";
  required: boolean;
  placeholder: string;
  name: string;
  value: string | number;
  error: boolean;
  id: string;
  autoFocus: boolean;
  pattern?: string;
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  type,
  required,
  placeholder,
  name,
  value,
  error,
  id,
  autoFocus,
  pattern,
  disabled,
  onChange,
}) => {
  return (
    <input
      className={styles.input}
      type={type}
      required={required}
      placeholder={placeholder}
      name={name}
      value={value}
      id={id}
      autoFocus={autoFocus}
      pattern={pattern}
      disabled={disabled}
      onChange={onChange}
    />
  );
};

export default Input;
