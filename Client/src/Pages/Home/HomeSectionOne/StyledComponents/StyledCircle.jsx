import styled, { css, keyframes } from "styled-components";

const circleExpandShrink = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(10);
  }
  100% {
    transform: scale(1);
  }
`;

export const StyledCircle = styled.div`
  width: 70%;
  height: 0;
  padding-bottom: 50%;
  border-radius: 50%;
  background-color: var(--white);
  position: absolute;
  bottom: -70%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;

  &::after {
    content: "";
    position: absolute;
    border-radius: inherit;
    background-color: var(--white);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    transform: scale(1);

    ${({ $isAnimating }) =>
      $isAnimating &&
      css`
        animation: ${circleExpandShrink} 4s linear forwards;
      `}
  }
`;
