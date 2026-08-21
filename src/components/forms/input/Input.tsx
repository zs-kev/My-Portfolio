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
  autoComplete?: string;
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
  autoComplete,
  onChange,
}) => {
  return (
    <input
      className={`${styles.input} ${error ? styles.error : ""}`}
      type={type}
      required={required}
      placeholder={placeholder}
      name={name}
      value={value}
      id={id}
      autoFocus={autoFocus}
      pattern={pattern}
      disabled={disabled}
      autoComplete={autoComplete}
      // The error prop was accepted and then ignored, so an invalid field
      // could never be indicated to anyone, visually or otherwise.
      aria-invalid={error || undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      onChange={onChange}
    />
  );
};

export default Input;
