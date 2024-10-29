import { Myaccount } from "../Component.jsx/Myaccount";
import { Addresses } from "../Component.jsx/Addresses";
import { css } from "styled-components";

export const Myaccounts = () => {
  return (
    <div>
      <style>
        {css`
          .account {
            display: flex;
            // background-color: #ffffe6;
            justify-content: center;
            padding: 20px;
            padding-top: 14rem;
          }

          @media (min-width: 1024px) {
            .address-section {
              margin-top: 7%;
            }
          }
          @media (max-width: 600px) {
            .account {
              flex-direction: column;
              justify-content: space-around;
              align-items: center;
              padding: 10px;
              gap: 10px;
              padding-top: 15rem;
            }
          }

          @media (max-width: 768px) {
            .account {
              flex-direction: column;
              justify-content: space-around;
              align-items: center;
              padding: 10px;
              gap: 10px;
              padding-top: 15rem;
              /* background-color: blue; */
              /* display: none; */
            }
          }

          @media (max-width: 480px) {
            .account {
              flex-direction: column;
              justify-content: space-around;
              align-items: center;
              padding: 5px;
              gap: 5px;
              padding-top: 10rem;
              overflow: visible;
              height: 120vh;
            }
            .address-section {
              margin-top: -40%;
              width: 100%;
            }
          }
        `}
      </style>

      <div className="account">
        <Myaccount />
        <div className="address-section">
          <Addresses />
        </div>
      </div>
    </div>
  );
};
