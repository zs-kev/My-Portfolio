import { ChangeEvent } from "react";
import styles from "./Textarea.module.css";

export interface TextareaProps {
  required: boolean;
  placeholder: string;
  name: string;
  value: string | number;
  error: boolean;
  disabled?: boolean;
  id: string;
  autoFocus: boolean;
  rows: number;
  cols: number;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea: React.FC<TextareaProps> = ({
  required,
  placeholder,
  name,
  value,
  error,
  disabled,
  id,
  autoFocus,
  rows,
  cols,
  onChange,
}) => {
  return (
    <textarea
      className={styles.textarea}
      required={required}
      placeholder={placeholder}
      name={name}
      value={value}
      disabled={disabled}
      id={id}
      autoFocus={autoFocus}
      rows={rows}
      cols={cols}
      onChange={onChange}
    ></textarea>
  );
};

export default Textarea;
