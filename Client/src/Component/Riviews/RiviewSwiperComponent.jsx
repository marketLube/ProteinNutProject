import React from "react";
import styles from "./RiviewSwiperComponent.module.css";

export const RiviewSwiperComponent = ({ review, key }) => {
  console.log(review, key);

  return (
    <div>
      <div className={styles.reviewbox}>
        <div className={styles.reviewrating}>
          <span className={styles.ratingbadge}>{review?.rating}★</span>
          <span className={styles.ratingtext}>{review?.title}</span>
        </div>
        <p className={styles.reviewtext}>{review?.message}</p>
        <p className={styles.reviewerinfo}>
          {review?.user?.name} , {review?.user?.email}
        </p>
      </div>
    </div>
  );
};
