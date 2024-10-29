import React from "react";
import { useSelector } from "react-redux";
import { css } from "styled-components";

export const Addresses = () => {
  const { user } = useSelector((state) => state.general);
  return (
    <div>
      <style>
        {css`
          .address-container {
            max-width: 600px;
            // margin: auto;
            padding: 30px;
            // background-color: #f5f5e9;
            font-family: Arial, sans-serif;
            margin-top: 10px;
            width: 100%;
          }
          .address-header {
            font-size: 28px;
            font-weight: bold;
            color: #00004d;
            margin-bottom: 20px;
          }
          .address-card {
            background-color: #fff;
            padding: 40px 30px;
            border-radius: 15px;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
            border: 1px solid #eee;
            width: 100%;
          }
          .address-card h5 {
            font-size: 16px;
            color: #00004d;
            margin-bottom: 10px;
          }
          .address-details {
            font-size: 18px;
            color: #00004d;
            line-height: 1.5;
          }
        `}
      </style>

      <div className="address-container">
        <h2 className="address-header">Addresses</h2>
        <div className="address-card">
          <h5>Email || Phone</h5>
          <hr />
          <p className="address-details">
            {user?.email || user?.phone}
            <br />
            {user?.address || "Undisclosed place"}
          </p>
        </div>
      </div>
    </div>
  );
};
