import styles from "./OrderStats.module.css";

const StatCard = ({ iconClass, label, value }) => {
  return (
    <div className={styles.statCard}>
      {/* <div className={`${styles.statIcon} ${styles[iconClass]}`}></div> */}
      <div className={styles.statContent}>
        <span className={styles.statValue}>{value}</span>
        <span className={styles.statLabel}>{label}</span>

      </div>
    </div>
  );
};

export default StatCard;
