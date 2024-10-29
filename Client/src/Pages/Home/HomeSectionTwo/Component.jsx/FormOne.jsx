import React from "react";
import { useForm } from "react-hook-form";
import { css } from "styled-components";

export const FormOne = () => {
  const form = useForm();
  const { register, handleSubmit } = form;

  const onSubmitftn = (data) => {
    console.log(data);
  };

  return (
    <div>
      <style>
        {css`
          .form-container {
            max-width: 100%;
            margin: auto;
            padding: 1px;
            height: 100%;
            // width: 100vw;
            // background-color:#ff6666;
          }
          .form-container label {
            display: block;
            margin-bottom: 10px;
            font-weight: bold;
            font-size: 18px;
          }
          .form-container input {
            width: 100%;
            padding: 10px;
            margin-bottom: 20px;
            border: 1px solid #00004d;
            border-radius: 5px;
          }
          .form-container input::placeholder {
            color: #00004d;
            font-weight: bold;
          }
          .form-container button {
            width: 100%;
            padding: 10px;
            background-color: #00004d;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
          .form-container button:hover {
            background-color: #00004d;
          }
          /* Media Queries */
          @media (max-width: 600px) {
            .form-container {
              /* max-width: 400px; */
              width: 90%;
            }
            .form-container label {
              font-size: 20px;
            }
            .form-container input {
              padding: 12px;
            }
            .form-container button {
              padding: 12px;
            }
          }
          @media (min-width: 768px) {
            .form-container label {
              font-size: 22px;
            }
            .form-container input {
              padding: 14px;
            }
            .form-container button {
              padding: 14px;
            }
          }
          @media (min-width: 1024px) {
            .form-container {
              max-width: 100%;
              width: 100%;
            }
            .form-container label {
              font-size: 25px;
            }
            .form-container input {
              padding: 16px;
            }
            .form-container button {
              padding: 16px;
            }
          }
        `}
      </style>
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmitftn)}>
          <label>Payment</label>
          <input
            type="text"
            placeholder="UPI"
            {...register("payment", { required: "Payment is required" })}
          />
          <label>Or</label>
          <div>
            <input
              type="text"
              placeholder="Card Payment"
              {...register("card")}
            />
            <span aria-hidden="true"></span>
          </div>
          <button type="submit">Payment</button>
        </form>
      </div>
    </div>
  );
};
