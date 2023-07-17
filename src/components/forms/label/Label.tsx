import styles from "./Label.module.css";

export interface LabelProps {
  htmlFor: string;
  floatingLabel: boolean;
  error: boolean;
  children: any;
}

const Label: React.FC<LabelProps> = ({
  htmlFor,
  floatingLabel,
  error,
  children,
}) => {
  return (
    <label className={`${styles.label} ${floatingLabel && styles.floatingLabel}`} htmlFor={htmlFor}>
      {children}
    </label>
  );
};

export default Label;
