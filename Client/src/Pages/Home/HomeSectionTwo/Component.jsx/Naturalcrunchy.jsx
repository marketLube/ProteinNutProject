import React, { useState } from "react";
import { Link } from "react-router-dom";
import { css } from "styled-components";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import api from "../../../../services/api";
import toast from "react-hot-toast";

export const ProductDisplay = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [location, setLocation] = useState("");
  const [pincode, setPincode] = useState("");
  const [selectedWeight, setSelectedWeight] = useState("500G"); // Default weight

  // Calculate sale price
  const salePrice = product.price - product.price * (product.offer / 100);

  // Function to render stars based on rating
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

  // Handle pincode input change
  const handlePincodeChange = (e) => {
    setPincode(e.target.value);
    setLocation("");
  };

  // Function to handle location check based on pincode
  const checkAvailability = () => {
    if (pincode === "673019") {
      setLocation("Olavanna, Kozhikode");
    } else {
      setLocation("Location not available");
    }
  };

  const handleClick = async () => {
    try {
      const res = await api.patch(`cart/add-product-to-cart/${product?._id}`);
      toast.success("success fully added");
    } catch (error) {
      toast.error("Please try again later");
    }
  };

  return (
    <div>
      <style>
        {css`
          .container-main {
            padding: 20px;
          }

          .container {
            max-width: 419px;
            margin: 0 auto;
            padding: 40px;
            background-color: white;
            border-radius: 20px;
          }

          .category-tag {
            display: inline-block;
            padding: 8px 16px;
            background-color: #fff9f2;
            border-radius: 20px;
            margin-bottom: 16px;
            color: #00004d;
            font-weight: bold;
          }

          .product-title {
            font-size: 32px;
            color: #00004d;
            margin-bottom: 16px;
          }

          .rating-container {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 16px;
          }

          .star {
            color: #ffd700;
          }

          .review-count {
            color: #666;
            margin-left: 8px;
          }

          .top-rated {
            color: #4caf50;
            font-weight: bold;
            margin-bottom: 16px;
          }

          .price-container {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 16px;
          }

          .current-price {
            font-size: 24px;
            font-weight: bold;
            color: #00004d;
          }

          .original-price {
            text-decoration: line-through;
            color: #666;
          }

          .discount {
            color: #4caf50;
            font-size: 14px;
          }

          .location-container {
            display: flex;
            justify-content: space-between;
            margin-bottom: 24px;
          }

          .quantity-container {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 24px;
          }

          .quantity-button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 28px;
            height: 28px;
            border: 1px solid #00004d;
            border-radius: 50%;
            background: none;
            cursor: pointer;
          }

          .quantity-display {
            font-size: 18px;
          }

          .size-button {
            padding: 5px 10px;
            background-color: #fff9f2;
            border: none;
            border-radius: 4px;
            font-weight: bold;
            font-size: 12px;
            transition: background-color 0.3s ease, border-color 0.3s ease;
          }

          .size-button.active {
            border: 1px solid #4caf50;
          }

          .button-container {
            display: flex;
            gap: 16px;
            margin-bottom: 24px;
          }

          .check-availability {
            padding: 12px;
            background-color: #4caf50;
            color: white;
            border: none;
            border-radius: 50px;
            font-size: 10px;
            cursor: pointer;
            font-weight: bold;
          }

          .add-to-cart {
            flex: 1;
            padding: 12px;
            background-color: #4caf50;
            color: white;
            border: none;
            border-radius: 50px;
            font-size: 16px;
            cursor: pointer;
            font-weight: bold;
          }

          .buy-now {
            flex: 1;
            padding: 12px;
            background-color: #ffd54f;
            border: none;
            border-radius: 50px;
            font-size: 16px;
            cursor: pointer;
            font-weight: bold;
            color: #00004d;
          }

          .description {
            color: #00004d;
            line-height: 1.6;
            font-size: 15px;
          }
        `}
      </style>

      <div className="container-main">
        <div className="container">
          <span className="category-tag">{product?.category}</span>
          <h1 className="product-title">{product?.name}</h1>

          <div className="rating-container">
            {renderStars(product?.avgRatings)}
            <span className="review-count">{product?.ratingQty} Reviews</span>
          </div>

          <div className="top-rated">{product?.statistic}</div>

          <div className="price-container">
            <span className="current-price">₹{salePrice}</span>
            <span className="original-price">₹{product?.price}</span>
            <span className="discount">{product?.offer}% Off</span>
          </div>

          <div className="location-container">
            <div className="location-container-num">
              <input
                type="number"
                className="pincode"
                placeholder="Enter the pincode"
                value={pincode}
                onChange={handlePincodeChange}
                style={{
                  borderTop: "none",
                  borderRight: "none",
                  borderLeft: "none",
                  width: "80%",
                  padding: "10px",
                }}
              />
            </div>
            <div className="location-container-text">
              {location && pincode ? (
                <span
                  className="location-container-text"
                  style={{ color: "#4caf50" }}
                >
                  {location}
                </span>
              ) : (
                <button
                  className="check-availability"
                  onClick={checkAvailability}
                >
                  Check
                </button>
              )}
            </div>
          </div>

          <div className="quantity-container">
            <button
              className="quantity-button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </button>
            <span className="quantity-display">{quantity}</span>
            <button
              className="quantity-button"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
            <div
              style={{ display: "flex", gap: ".5rem", flexDirection: "wrap" }}
            >
              <button
                className={`size-button ${
                  selectedWeight === "250G" ? "active" : ""
                }`}
                onClick={() => setSelectedWeight("250G")}
              >
                250G
              </button>
              <button
                className={`size-button ${
                  selectedWeight === "500G" ? "active" : ""
                }`}
                onClick={() => setSelectedWeight("500G")}
              >
                500G
              </button>
              <button
                className={`size-button ${
                  selectedWeight === "1KG" ? "active" : ""
                }`}
                onClick={() => setSelectedWeight("1KG")}
              >
                1KG
              </button>
            </div>
          </div>

          <div className="button-container">
            <button className="add-to-cart" onClick={handleClick}>
              Add to cart
            </button>
            <Link to="/homesectiontwo">
              <button className="buy-now">Buy Now</button>
            </Link>
          </div>

          <p className="description">{product?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
