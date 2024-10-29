import React from "react";
import styles from "./Counter.module.css";
import { setCartTotal } from "../../App/generalSlice/generalSlice";
import { useDispatch, useSelector } from "react-redux";

export const Counter = ({ quantity, setQuantity, item }) => {
  const { total } = useSelector((state) => state.general);
  const dispatch = useDispatch();
  const handleAddQuantity = () => {
    setQuantity(Math.max(1, quantity - 1));
    if (quantity <= 1) return;
    dispatch(setCartTotal(total - item.price));
  };
  const handleRemoveQuantity = () => {
    setQuantity(quantity + 1);
    dispatch(setCartTotal(total + item.price));
  };
  return (
    <div>
      <div className={styles.quantitycontainer}>
        <button className={styles.quantitybutton} onClick={handleAddQuantity}>
          -
        </button>
        <span className={styles.quantitydisplay}>{quantity}</span>
        <button
          className={styles.quantitybutton}
          onClick={handleRemoveQuantity}
        >
          +
        </button>
        <button className={styles.removebutton}>Remove</button>
      </div>
    </div>
  );
};
