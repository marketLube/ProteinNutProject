import React, { useState } from "react";
import styles from "./SelectedProduct.module.css";

export const SelectedProduct = ({ product }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  return (
    <div className={styles.main}>
      <img
        src={product?.image[selectedImageIndex]}
        alt={product?.name}
        className={styles.firstimg}
        onClick={() => setSelectedImageIndex(selectedImageIndex)}
      />

      <div className={styles.firstsection}>
        {product?.image.map((img, index) => {

          if(product?.image[index]){
            return (<img
              key={index}
              src={img}
              alt={product?.name}
              onClick={() => setSelectedImageIndex(index)}
              className={index === selectedImageIndex ? styles.selectedImg : ''}
            />)
          }
          else{
            return null;
          }
          
        })}


      </div>
    </div>
  );
};
