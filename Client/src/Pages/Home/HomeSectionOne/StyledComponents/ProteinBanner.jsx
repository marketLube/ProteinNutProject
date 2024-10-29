import styled from 'styled-components';

export const StyledProteinBanner = styled.div`
font-family: "SUSE", "Kanit", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px;
  margin-top: 20px;
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;

  .banner-stripe {
    width: 100%;
    height: 5vh;
    margin-bottom: 2px;
  }

  .banner-content {
    display: flex;
    justify-content: center;
    align-items: center;
    gap:1rem;
    width: 100%;
    padding: 10px 0;
  }

  .banner-text {
    // font-size: clamp(14px, 100vw, 18px);
    font-size: 18px;
    font-weight: bold;
    color: #333;
    text-align: center;
  }

  .shop-button {
    background-color: #4a8f3c;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
    display: flex;
    align-items: center;
    border-radius: 25px;

    &:hover {
      background-color: #3a7230;
    }

    .button-text {
      margin-right: 10px;
    }

    .arrow-circle {
      width: 24px;
      height: 24px;
      background-color: white;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .arrow {
      width: 12px;
      height: 2px;
      background-color: #4a8f3c;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        right: 0;
        top: -3px;
        width: 6px;
        height: 2px;
        background-color: #4a8f3c;
        transform: rotate(45deg);
      }

      &::before {
        content: '';
        position: absolute;
        right: 0;
        bottom: -3px;
        width: 6px;
        height: 2px;
        background-color: #4a8f3c;
        transform: rotate(-45deg);
      }
    }
  }

  @media (max-width: 768px) {
    .banner-content {
      flex-direction: column;
      // align-items: stretch;
    }

    .banner-text {
      margin-bottom: 10px;
      text-align: center;
    }

    .shop-button {
      width: 100%;
    }
  }

  @media (max-width: 480px) {
    .banner-text {
      font-size: clamp(12px, 3vw, 16px);
    }
  }
`;