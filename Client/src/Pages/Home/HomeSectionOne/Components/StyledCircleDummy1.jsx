import styled, { keyframes } from "styled-components";
const moveIn = keyframes`
  0% {
      opacity:0;
    }
    50%{
      opacity:0;
    }
    100% {
      opacity:1;
    }
`;
export const StyledCircleDummy1 = styled.div`
  width: 70%;
  height: 0;
  padding-bottom: 50%;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  bottom: -70%;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(-50%);
  
  animation: ${moveIn}moveIn 2s ease-in-out ;

`;