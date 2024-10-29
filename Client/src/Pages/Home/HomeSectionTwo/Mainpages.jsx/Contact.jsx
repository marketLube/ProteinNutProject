import { Contactpage } from "../Component.jsx/Contactpage";
import { Bill } from "../Component.jsx/Bill";
import { css } from "styled-components";

export const Contact = () => {
  return (
    <div>
      <style>
        {css`
          .formone {
            padding-top: 10rem;
            display: grid;
            grid-template-columns: 1fr 1fr; /* Two columns layout */
            gap: 10rem;
            background-color: #f3f1e8;
          }

          .formone > * {
            display: flex;
            padding: 10rem;
          }

          /* Responsive Styles */
          @media (max-width: 768px) {
            .formone {
              grid-template-columns: 1fr; /* Stack columns on smaller screens */
              padding-top: 5rem; /* Reduce padding for smaller screens */
              gap: 5rem; /* Reduce gap between elements */
            }

            .formone > * {
              padding: 5rem; /* Reduce padding for child components */
            }
          }

          @media (max-width: 480px) {
            .formone {
              padding-top: 3rem; /* Further reduce padding for very small screens */
              gap: 3rem; /* Further reduce gap between elements */
            }

            .formone > * {
              padding: 2rem; /* Further reduce padding for child components */
            }
          }
        `}
      </style>

      <div className="formone">
        <Contactpage />
        <Bill />
      </div>
    </div>
  );
};
