import styled from "styled-components";

export const MainHeading = styled.div`
  font-family: "Degular", "Kanit", sans-serif;
  font-size: 12rem; // Increased from 8rem
  width: 70%;
  font-weight: 700;
  line-height: 10rem; // Reduced from 9rem
  letter-spacing: -0.5rem;
  margin: 0 auto;
  text-align: center;
  color: var(--font-gray);
  position: absolute;
  top: 14rem;
  z-index: 20;
  left: 50%;
  transform: translateX(-50%);
  padding-bottom: 20px;

  @media (max-width: 1200px) {
    font-size: 9rem; // Increased from 7rem
    line-height: 7.5rem; // Reduced from 8rem
    letter-spacing: -0.4rem;
    top: 14rem;
    padding-bottom: 15px;
    font-size: 6rem;
  }

  @media (max-width: 992px) {
    font-size: 5rem; // Increased from 5rem
    line-height: 5.5rem; // Reduced from 6rem
    letter-spacing: -0.3rem;
    top: 13rem;
    padding-bottom: 10px;
  }

  @media (max-width: 768px) {
    font-size: 6rem; // Increased from 3rem
    line-height: 3.8rem; // Reduced from 4rem
    letter-spacing: -0.2rem;
    top: 11rem;
    padding-bottom: 5px;
  }

  @media (max-width: 576px) {
    font-size: 3.5rem; // Increased from 4rem
    line-height: 4.2rem; // Reduced from 4.5rem
    letter-spacing: -0.1rem;
    top: 17%;
    padding-bottom: 5px;
  }
  @media (max-width: 375px) {
    font-size: 4rem; // Reduced from 4rem
    line-height: 3.3rem; // Reduced from 3.8rem
    letter-spacing: -0.2rem;
    top: 11rem;
  }
`;

export const SubHeading = styled.div`
  font-family: "Degular", "Kanit", sans-serif;
  font-size: 2rem;
  font-weight: normal;
  margin-top: 20px;
  text-align: center;
  width: 20rem;

  @media (max-width: 1200px) {
    font-size: 2rem;
    margin-top: 15px;
  }

  @media (max-width: 992px) {
    font-size: 0.9rem;
    margin-top: 10px;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-top: 5px;
  }

  @media (max-width: 576px) {
    font-size: 1rem;
    margin-top: 5px;
  }
`;
