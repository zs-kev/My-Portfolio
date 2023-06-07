import styles from "./Logo.module.css";

export interface LogoProps {
  copywrite: boolean;
}

const Logo: React.FC<LogoProps> = ({ copywrite }) => {
  return (
    <div>
      <p className={styles.logo}>
        kevin<span>.</span>
      </p>
      {copywrite && (
        <p className={styles.copywrite}>&copy; 2023 Kevin Simon Portfolio</p>
      )}
    </div>
  );
};

export default Logo;
