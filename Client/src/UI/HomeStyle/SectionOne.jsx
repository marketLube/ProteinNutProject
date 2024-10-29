import styled, { css, keyframes } from "styled-components";

const createBgAnim = (prevColor, curColor) => {
  return keyframes`
    0% {
      background-color: ${prevColor};
    }
    100% {
      background-color: ${curColor};
    }
  `;
};

export const StyledSectionOne = styled.section`
  height: 100vh;
  width: 100vw;
  background-color: var(--light-green);
  position: relative;
  overflow: hidden;

  ${({ $prevColor, $curColor, $isChangingColor }) =>
    $isChangingColor &&
    css`
      animation: ${createBgAnim($prevColor, $curColor)} 0.5s forwards;
    `}// display:none;
`;
