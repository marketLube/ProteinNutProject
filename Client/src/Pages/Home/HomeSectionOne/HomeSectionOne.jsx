import { useState, useCallback } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import useObserver from "../../../Hooks/useObserver";
import { setIsHome } from "../../../App/generalSlice/generalSlice";
import { StyledSectionOne } from "../../../UI/HomeStyle/SectionOne";
import { MainHeading as StyledMainHeading } from "./StyledComponents/MainHeading";

import { motion } from "framer-motion";
import BottomCircle from "./BottomCircle";
import styled from "styled-components";

import { BannerWrapper, BannerText } from "./StyledComponents/BannerComponents";
import ShopButton from "../../../Component/ShopButton/ShopButton";

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 2;
`;

const AnimatedText = ({ text, delay }) => {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        duration: 0.6,
        stiffness: 200,
        ease: [0.43, 0.13, 0.23, 0.96],
        delay: 0.1,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        duration: 0.6,
        stiffness: 200,
        ease: [0.43, 0.13, 0.23, 0.96],
        delay: 0.1,
      },
    },
  };

  return (
    <motion.h1
      style={{
        display: "flex",
        justifyContent: "center",
        fontSize: "inherit",
        lineHeight: "inherit",
        margin: 0,
      }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          layout={{ duration: 5 }}
          key={index}
          animate={{ x: 0, opacity: 1, y: 0 }}
          initial={{ x: 100, opacity: -1, y: 100 }}
          transition={{ duration: 1 }}
          type="tween"
          style={{
            marginRight: "0.25em",
            display: "inline-block",
          }}
          variants={child}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
};

const CurlingText = ({ text }) => {
  const [isHovered, setIsHovered] = useState(false);
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const child = {
    hidden: {
      y: 0,
      rotateX: 0,
      scale: 1,
    },
    visible: (i) => ({
      y: Math.sin(i * 0.5) * 10,
      rotateX: -360,
      scale: [1, 1.2, 1],
      transition: {
        y: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 0.5,
          ease: "easeInOut",
        },
        rotateX: {
          duration: 0.5,
          ease: "easeInOut",
        },
        scale: {
          duration: 0.5,
          times: [0, 0.5, 1],
        },
      },
    }),
  };

  return (
    <motion.span
      style={{ display: "inline-block" }}
      variants={container}
      initial="hidden"
      animate={isHovered ? "visible" : "hidden"}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          style={{ display: "inline-block", marginRight: "0.05em" }}
          custom={index}
          variants={child}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

const colors = ["#C7F009", "#3e2d26", "#ffcb80"];

const ChangingText = ({ colorIndex }) => {
  const phrases = ["Crunchy Energy", "Nutty Goodness", "Protein Power"];

  return (
    <AnimatedText
      text={phrases[colorIndex]}
      delay={0}
      isChanging={true}
      key={colorIndex}
    />
  );
};

function HomeSectionOne() {
  const targetRef = useRef(null);
  const dispatch = useDispatch();
  useObserver(targetRef, (isVisible) => dispatch(setIsHome(isVisible)), 0.8);

  const [prevColor, setPrevColor] = useState(colors[0]);
  const [curColor, setCurColor] = useState(colors[0]);
  const [isChangingColor, setIsChangingColor] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);

  const handleColorChange = useCallback((newColor, oldColor) => {
    setPrevColor(oldColor);
    setCurColor(newColor);
    setIsChangingColor(true);
    setColorIndex((prevIndex) => (prevIndex + 1) % 3);

    // Reset isChangingColor after animation completes
    setTimeout(() => setIsChangingColor(false), 500);
  }, []);

  return (
    <StyledSectionOne
      ref={targetRef}
      $prevColor={prevColor}
      $curColor={curColor}
      $isChangingColor={isChangingColor}
    >
      <ContentWrapper>
        <StyledMainHeading>
          <motion.div layout>
            <AnimatedText text="Boost your Day" delay={0.2} />
          </motion.div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10",
              fontSize: "inherit",
              lineHeight: "inherit",
            }}
          >
            <motion.div layout>
              <AnimatedText text="with" delay={0.4} />
            </motion.div>
            <ChangingText colorIndex={colorIndex} />
          </div>
        </StyledMainHeading>
        <BannerWrapper>
          <BannerText>
            Packed with Protein, Powered by Peanut Butter.
          </BannerText>

          <ShopButton style={{ margin: "3rem" }} />
        </BannerWrapper>
      </ContentWrapper>
      <BottomCircle onColorChange={handleColorChange} />
      {/* <StyledCircleDummy/> */}
    </StyledSectionOne>
  );
}

export default HomeSectionOne;
