import styles from "./Green.module.css";
import { Parallax } from "react-scroll-parallax";

export const Green = () => {
  return (
    <div className={styles.card}>
      <Parallax
        speed={10}
        scale={[1, 1.2]} // S.2tarts at 100% size and scales to 120%
        easing={[0.25, 0.1, 0.25, 1]}
        className={styles.parallax}
      >
        <div className={styles.content}>
          <img
            src="/Image/1pr-03.svg"
            alt="image"
            className={`${styles.textItem} ${styles.protein}`}
          />
          <img
            src="/Image/1pr-04.svg"
            alt="image"
            className={`${styles.textItem} ${styles.heart} ${styles.sizeheart}`}
          />
          <img
            src="/Image/1pr-02.svg"
            alt="image"
            className={`${styles.textItem} ${styles.nutrient}`}
          />
          <img
            src="/Image/1pr.svg"
            alt="image"
            className={`${styles.textItem} ${styles.energy} ${styles.size}`}
          />
        </div>
      </Parallax>
    </div>
  );
};
