// SkeletonLoader.js
import React from "react";
import styles from "./SkeletonLoader.module.css"; // Create this CSS file for styling

const SkeletonLoader = () => {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonImage} />
      <div className={styles.skeletonTitle} />
      <div className={styles.skeletonStars} />
      <div className={styles.skeletonPriceContainer}>
        <div className={styles.skeletonCurrentPrice} />
        <div className={styles.skeletonOriginalPrice} />
      </div>
      <div className={styles.skeletonButton} />
    </div>
  );
};

export default SkeletonLoader;