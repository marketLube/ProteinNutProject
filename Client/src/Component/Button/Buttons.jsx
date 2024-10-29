import React from "react";
import styles from "./Buttons.module.css";

export const Buttons = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.buttoncheckout}>
      Check Out
    </button>
  );
};
