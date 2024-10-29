import { useRef } from "react";
import styles from "./HomeLandingSection1.module.css";
import { Parallax } from "react-scroll-parallax";
import ShopButton from "./ShopButton/ShopButton";
import { motion, useInView } from "framer-motion";

export const HomeLandingSection1 = () => {
  const targetRef = useRef(null);
  const isInView = useInView(targetRef, { amount: 0.3 });

  return (
    <>
      <Parallax speed={0} className={styles.healthyflavr} id="community">
        <motion.h2
          ref={targetRef}
          initial={{ y: 50 }}
          animate={isInView ? { y: 0 } : { y: 50 }}
          transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
          className={styles.head}
        >
          <div className={styles.headingFirst}>
            <span className={styles.simple}>Healthy</span>
            <div style={{ overflow: "hidden" }}>
              <motion.div
                className={styles.infinite}
                initial={{ y: 100 }}
                animate={isInView ? { y: 0 } : { y: 100 }}
                transition={{
                  duration: 0.6,
                  ease: [0.43, 0.13, 0.23, 0.96],
                  delay: 0.1,
                }}
              >
                flavours Inifinite
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{
                    duration: 1.5,
                    ease: [0.43, 0.13, 0.23, 0.96],
                    originX: 0, // Ensures scaling starts from left
                  }}
                  className={styles.whiteBg}
                  style={{
                    transformOrigin: "left", // Backup CSS transform origin
                  }}
                />
              </motion.div>
            </div>
          </div>
          <div
            style={{
              overflow: "hidden",
              fontFamily: "Degular",
              height: "8rem",
            }}
          >
            <motion.div
              initial={{ y: 100 }}
              animate={isInView ? { y: 0 } : { y: 100 }}
              transition={{
                duration: 0.6,
                ease: [0.43, 0.13, 0.23, 0.96],
                delay: 0.2,
              }}
              className={styles.possibilities}
            >
              possibilities
            </motion.div>
          </div>
        </motion.h2>
        <div className={styles.subhead}>
          Packed with Protein, Powered by Peanut Butter.
        </div>

        <ShopButton style={{ margin: "3rem" }} />
      </Parallax>
    </>
  );
};
