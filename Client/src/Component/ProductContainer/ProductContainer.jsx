// ProductContainer.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ProductContainer.module.css";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import api from "../../services/api";
import { setIsCart } from "../../App/generalSlice/generalSlice";

export const ProductContainer = ({ product }) => {
  const navigate = useNavigate();

  const { cart } = useSelector((state) => state.general);

  const [isincart, setisincart] = useState(
    cart?.products?.find((prod) => prod?._id === product?._id) || false
  );

  const currentPrice = product.price - product.price * (product.offer / 100);

  const dispatch = useDispatch();

  const handleProductClick = () => {
    navigate("/user/select", { state: { product } });
    window.scrollTo(0, 0);
  };

  const handleAddToCart = async () => {
    const res = await api.patch(`add-product-to-cart/${product._id}`);
    dispatch(setIsCart());
    console.log(res, "res");
  };

  const handleRemoveCart = () => {
    api.patch(`remove-product-in-cart/${product._id}`);
    dispatch(setIsCart());
  };

  const renderStars = (avgRatings) => {
    const stars = [];
    const fullStars = Math.floor(avgRatings);
    const hasHalfStar = avgRatings % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} size={24} className="star" color="orange" />);
    }

    if (hasHalfStar) {
      stars.push(
        <FaStarHalfAlt
          key={fullStars}
          size={24}
          className="star"
          color="orange"
        />
      );
    }

    const emptyStarsCount = 5 - Math.ceil(avgRatings);
    for (let i = 0; i < emptyStarsCount; i++) {
      stars.push(
        <FaStar
          key={fullStars + 1 + i}
          size={24}
          className="star"
          color="lightgray"
        />
      );
    }

    return stars;
  };

  return (
    <div
      className={styles.productcard}
      style={{ display: "flex", alignItems: "start" }}
    >
      <div
        onClick={handleProductClick}
        style={{ cursor: "pointer", textDecoration: "none" }}
      >
        <div className={styles.imagediv}>
          <img
            src={product?.image[0]}
            alt={product?.name}
            className={`${styles.productimage} hover-animation`}
          />
        </div>

        <div className={styles.detailofproduct}>
          <h2 className={styles.producttitle}>{product?.name}</h2>

          <div className={styles.starses}>
            {renderStars(product?.avgRatings)}
          </div>

          <div className={styles.pricecontainer}>
            <span className={styles.currentprice}>Rs. {currentPrice}</span>
            <span className={styles.originalprice}>Rs. {product?.price}</span>
          </div>
          {isincart ? (
            <button
              className={styles.addtocartbutton}
              onClick={handleRemoveCart}
            >
              Remove from the cart
            </button>
          ) : (
            <button
              className={styles.addtocartbutton}
              onClick={handleAddToCart}
            >
              Add to the Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
