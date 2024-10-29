import styled, { css } from "styled-components";

const move = css`
  transform: translateY(2rem);
`;
const dontMove = css`
  transform: translateY(0rem);
`;

export const StyledHeader = styled.header`
  @media (max-width: 768px) {
    display: none;
  }
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 7rem;
  position: fixed;
  left: 5rem;
  right: 5rem;
  z-index: 100;
  padding: 0 5rem;
  transition: transform 0.5s ease;
  ${(props) => (props.$isHome || props.$isCart ? move : dontMove)};
  overflow: hidden;
`;

const hide = css`
  transform: translateY(-7rem);
`;
const visible = css`
  transform: translateY(0rem);
`;

export const HeaderBg = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
  background-color: white;
  z-index: 99;
  position: fixed;
  left: 5rem;
  right: 5rem;
  height: 7rem;
  transition: transform 0.5s ease;
  border-bottom-left-radius: var(--radius-lg);
  border-bottom-right-radius: var(--radius-lg);
  ${(props) => (props.$isHome || props.$isCart ? hide : visible)};
`;
