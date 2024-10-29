import { useEffect } from "react";
import { motion, useAnimation, useCycle } from "framer-motion";
import styled, { keyframes } from "styled-components";
import { StyledCircleDummy } from "./Components/StyledCircleDummy";

import heroImage from "/assets/hero-image.png";
import heroImage2 from "/assets/hero-image-2.png";
import heroImage3 from "/assets/hero-image-3.png";

const colors = ["#C7F009", "#9b8977", "#ff9500"];
const heroImages = [heroImage, heroImage2, heroImage3];

const StyledCircle = styled(motion.div)`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  overflow: hidden;
`;

const Background = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Circle = styled(motion.div)`
  position: absolute;
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 50%;
  bottom: -100px;
  left: 40%;
  transform: translateX(-100%);
`;

const fadeIn1 = keyframes`
  0% {
    transform: translateX(-70%) scale(0.6) rotate(-10deg) translateY(120%);
  }
  25% {
    transform: translateX(-70%) scale(0.6) rotate(-10deg) translateY(150%);
  }
  40% {
    transform: translateX(-70%) scale(0.6) rotate(-20deg) translateY(20%);
  }
  70% {
    transform: translateX(-70%) scale(0.6) rotate(-20deg) translateY(20%);
  }
  80% {
    transform: translateX(-70%) scale(0.6) rotate(-20deg) translateY(20%);
  }
  90% {
    transform: translateX(-70%) scale(0.6) rotate(-20deg) translateY(20%);
  }
  100% {
    transform: translateX(-70%) scale(0.6) rotate(-20deg) translateY(120%);
  }
`;

const fadeIn2 = keyframes`
  0% {
  transform: translateX(-35%) scale(0.9) rotate(0deg) translateY(120%);
  }
  25% {
  transform: translateX(-35%) scale(0.8) rotate(10deg) translateY(150%);
  }
  40% {
  transform: translateX(-38%) scale(0.8) rotate(12deg) translateY(20%);
  }  
  70% {
  transform: translateX(-35%) scale(0.8) rotate(15deg) translateY(20%);
  }80%{
  transform: translateX(-35%) scale(0.8) rotate(12deg) translateY(28%);
  }

  90% {
  transform: translateX(-35%) scale(0.8) rotate(12deg) translateY(20%);
  }
 100% {
    transform: translateX(-35%) scale(0.8) rotate(10deg) translateY(100%);
  }
`;

const HeroImage1 = styled.img`
  position: absolute;
  bottom: 0%;
  left: 50%;
  right: 50%;
  transform: translateX(-80%) scale(0.6) rotate(-35deg) translateY(40%);
  z-index: 1;
  animation: ${fadeIn1} 4s infinite cubic-bezier(0.37, 0.74, 0.69, 0.96); /* Animation repeats twice every 4 seconds */
  max-width: 100%;
  height: auto;
`;

const HeroImage2 = styled.img`
  position: absolute;
  bottom: -5%;
  left: 50%;
  right: 55%;
  transform: translateX(-35%) scale(0.7) rotate(30deg) translateY(20%);
  animation: ${fadeIn2} 4s infinite cubic-bezier(0.37, 0.74, 0.69, 0.96); /* Animation repeats once only every 4 seconds */
  z-index: 2;
  max-width: 100%;
  height: auto;
`;

function BottomCircle({ onColorChange }) {
  const [colorIndex, cycleColorIndex] = useCycle(0, 1, 2);
  const [imageIndex, cycleImageIndex] = useCycle(0, 1, 2);
  const circleControls = useAnimation();
  const backgroundControls = useAnimation();

  // Handle circle animation
  const animateCircle = async () => {
    // Expand without fading
    await circleControls.start({
      scale: 20,
      y: "-50%",
      x: "-10%",
      transition: { duration: 0.8, ease: [0.25, 0.5, 0.28, 0.1] },
    });

    // Fade out after expansion
    await circleControls.start({
      opacity: 0,
      transition: { duration: 0.2, ease: "ease" },
    });

    // Reset the circle
    circleControls.start({
      scale: 1,
      y: 0,
      opacity: 1,
      transition: { duration: 0 },
    });
  };

  // Change the background color
  const changeBackground = async () => {
    await backgroundControls.start({
      backgroundColor: colors[colorIndex],
      transition: { duration: 0.25, delay: 0.9 },
    });
  };

  // Use useEffect to set animation timings
  useEffect(() => {
    const interval = setInterval(() => {
      animateCircle();
      cycleColorIndex(); // Change color every 4 seconds
      cycleImageIndex(); // Change image every 4 seconds
    }, 4000);

    return () => clearInterval(interval);
  }, [cycleColorIndex, cycleImageIndex]);

  useEffect(() => {
    changeBackground();
    onColorChange(
      colors[colorIndex],
      colors[(colorIndex - 1 + colors.length) % colors.length]
    );
  }, [colorIndex, onColorChange]);

  const getCurrentImage = () => heroImages[imageIndex];
  const getNextImage = () => heroImages[imageIndex];

  return (
    <StyledCircle>
      <Background
        animate={backgroundControls}
        initial={{ backgroundColor: colors[0] }}
      />
      <div>
        <HeroImage1
          src={getCurrentImage()}
          alt={`Hero-img-1-${imageIndex + 1}`}
        />
        <HeroImage2 src={getNextImage()} alt={`Hero-img-2-${imageIndex + 1}`} />
      </div>
      <StyledCircleDummy>
        <Circle animate={circleControls} />
      </StyledCircleDummy>
      <StyledCircleDummy />
    </StyledCircle>
  );
}

export default BottomCircle;
