import styles from "./Logo.module.css";
function Logo({ style }) {
  return (
    <div className={styles.logoContainer} style={style}>
      <img src="/Image/Logo.svg" alt="logo of proteing nut" />
    </div>
  );
}

export default Logo;
