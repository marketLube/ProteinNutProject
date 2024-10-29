import { ProductDisplay } from "../Component.jsx/Naturalcrunchy";
import { SelectedProduct } from "../Component.jsx/SelectedProduct";
import { css } from "styled-components";
import { Riviews } from "../../../../Component/Riviews/Riviews";
import { useLocation } from "react-router-dom";

export const SelectedItem = () => {
  const location = useLocation();
  const product = location.state?.product;
  console.log(product);

  return (
    <div>
      <style>
        {css`
          .formone {
            display: flex;

            justify-content: center;
            padding: 20px;
            gap: 20px;
            padding-top: 150px;
          }
          .total {
            display: flex;
            flex-direction: column;
            background-color: #ffffe6;
          }

          @media (max-width: 768px) {
            .formone {
              flex-direction: column;
              align-items: center;
              padding: 10px;
              gap: 10px;
              padding-top: 100px;
            }
          }

          @media (max-width: 480px) {
            .formone {
              flex-direction: column;
              align-items: center;
              padding: 5px;
              gap: 5px;
              padding-top: 50px;
            }
          }
        `}
      </style>
      <div className="total">
        <div className="formone">
          <SelectedProduct product={product} />
          <ProductDisplay product={product} />
        </div>
        <div>
          <Riviews product={product} />
        </div>
      </div>
    </div>
  );
};
