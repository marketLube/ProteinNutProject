import React, { useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";
import { Counter } from "../Counter/Counter";
import { useSelector } from "react-redux";

export const ProductDetails = ({ item }) => {
  const isMobile = useSelector(function (state) {
    return state.endpoint.isMobile;
  });

  const [quantity, setQuantity] = useState(1);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span>Product</span>
        <span>Quantity</span>
        <span>Total</span>
      </div>
      <div className={styles.productContainer}>
        <div className={styles.imageContainer}>
          <img
            src={item?.image}
            alt="Peanut Butter"
            className={styles.productImage}
          />
        </div>
        <div className={styles.det}>
          <div className={styles.productInfo}>
            <h3 className={styles.productTitle}>{item?.name}</h3>
            {/* <h3 className={styles.productTitle}></h3> */}
            <p className={styles.productPrice}>Rs. {item?.price}</p>
          </div>
          <div className={styles.quantityContainer}>
            <Counter
              quantity={quantity}
              setQuantity={setQuantity}
              item={item}
            />
          </div>
        </div>
        {isMobile ? null : (
          <div className={styles.totalPrice}>
            Rs. {(quantity * item?.price).toFixed(2)}
          </div>
        )}
      </div>
    </div>
  );
};
