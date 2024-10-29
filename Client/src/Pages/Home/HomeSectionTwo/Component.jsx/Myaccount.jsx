import React from "react";
import { useSelector } from "react-redux";
import { css } from "styled-components";
import api from "../../../../services/api";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import OrderItem from "./OrdersComponent/OrderItem";
import { Loaderorder } from "../../../../Component/Loader/Loaderorder";

export const Myaccount = () => {
  const { user } = useSelector((state) => state.general);

  const {
    data: orders,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["orders "],
    queryFn: () =>
      api.get(`/orders?user=${user?._id}`).then((res) => res.data.docs),
  });

  console.log(orders, "orders");
  console.log(error, "e");

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = api.post("/users/logout");
      console.log(res);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <style>
        {css`
          .account-container {
            max-width: 900px;
            margin: auto;
            padding: 18px;
            /* background-color: #2ec780; */
            font-family: Arial, sans-serif;
            width: 100vw;
            /* height: 100vh; */
            /* margin-top: 50rem; */
          }
          .account-header {
            font-size: 36px;
            font-weight: bold;
            color: #333;
            position: relative;
          }
          .account-header span {
            background-color: #ffd700;
            padding: 0 10px;
          }
          .logout-button {
            margin-top: 20px;
            padding: 10px 20px;
            background-color: transparent;
            border: 2px solid #333;
            color: #333;
            border-radius: 70px;
            font-size: 18px;
            cursor: pointer;
          }
          .logout-button:hover {
            background-color: #f5f5f5;
          }
          .order-history {
            margin-top: 40px;
          }
          .order-history h3 {
            font-size: 24px;
            color: #00004d;
            margin-bottom: 20px;
          }
          .order-item {
            display: flex;
            // justify-content: space-between;
            align-items: center;
            gap: 2rem;
            padding: 15px;
            // background-color: #fff;
            border-radius: 8px;
            // box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
            margin-bottom: 15px;
          }

          .order-image {
            width: 55px;
            height: 50px;
            background-color: #fff;
            border-radius: 10px;
          }

          .order-item span {
            font-size: 12px;
            color: #00004d;
            padding-right: 10px;
          }

          .order-detail {
            margin-right: 80px;
            background-color: #ac0d0d;
          }

          .order-status-track {
            background-color: #00004d;
            color: white;
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 14px;
            width: 80px;
            border: none; /* Remove border */
            outline: none; /* Remove outline */
          }
          .order-status-delivered {
            background-color: #4caf50;
            color: white;
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 14px;
            border: none; /* Remove border */
            outline: none;
          }
          .order-error {
            font-size: 3rem;
            color: red;
            font-weight: bold;
            height: 20vh;
            width: 80vw;
            display: flex;
            justify-content: start;
            align-items: center;
          }
          .order-loading {
            height: 10rem;
            width: 50rem;
            display: flex;
            /* justify-content: start;
            align-items: center; */
          }
        `}
      </style>

      <div className="account-container">
        <h1 className="account-header" id="account">
          <span>My Account</span>
        </h1>

        <button className="logout-button" onClick={handleLogout}>
          Log Out
        </button>
        {error && <div className="order-error">Network error </div>}
        {isLoading && (
          <div className="order-loading">
            <Loaderorder />
          </div>
        )}
        {!error && !isLoading && (
          <div className="order-history">
            <h3>Order History</h3>
            {orders?.map((item) => (
              <OrderItem key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
