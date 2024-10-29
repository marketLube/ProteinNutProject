import styles from "./Landingimg.module.css";
import { Parallax } from "react-scroll-parallax";
import { useSelector } from "react-redux";

const Landingimg = () => {
  const { isMobile, isDesktop } = useSelector((state) => state.endpoint);

  console.log(isDesktop, isMobile);

  return (
    <Parallax speed={0} className={styles.imgsection}>
      <Parallax
        className={styles.parallaxImgContainer}
        speed={isDesktop ? 20 : 10}
        scale={[0.8, 1]}
        easing={[0.25, 0.1, 0.25, 1]}
      >
        <Parallax
          speed={isDesktop ? 20 : 10}
          scale={isDesktop ? [1.3, 1.5] : [1.2, 1.7]}
          className={styles.imageContainer}
        >
          <img src="/Image/WebBanner.svg" alt="" className={styles.modalimg} />
        </Parallax>
      </Parallax>

      <Parallax
        speed={isDesktop ? 20 : 10}
        className={styles.yellowBg}
        scale={isDesktop ? [1.5, 5] : [1.3, 3]}
      />
    </Parallax>
  );
};

export default Landingimg;
