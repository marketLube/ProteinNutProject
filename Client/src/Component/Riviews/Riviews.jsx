import React, { useState } from "react";
import styles from "./Riviews.module.css";
import { FaArrowCircleRight } from "react-icons/fa";
import { Navigation } from "swiper/modules";
import { Swipercomponent } from "../Reelsection/Swipercomponent";
import { RiviewSwiperComponent } from "./RiviewSwiperComponent";
import { MdOutlineStarBorder } from "react-icons/md";
import { RiviewRating } from "./RiviewRating";
import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

export const Riviews = ({ product }) => {
  const [isRatingform, setisRatingform] = useState(false);
  const [isReview, setisReview] = useState();

  console.log(product, "product");
  const productid = product?._id;

  const handleClick = () => {
    setisRatingform(!isRatingform);
  };
  const {
    data: review,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["productriview"],
    queryFn: () =>
      api
        .get(`/reviews/product/${productid}`)
        .then((res) => res.data.data.reveiws),
  });

  const renderStars = (avgRatings) => {
    const stars = [];
    const fullStars = Math.floor(avgRatings);
    const hasHalfStar = avgRatings % 1 >= 0.5;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} size={24} className="star" color="orange" />);
    }

    // Add half star if applicable
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

    // Add empty stars
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
    <div className={styles.reviewsandratings}>
      <div className={styles.header}>
        <h2>Reviews & Ratings</h2>
        <button className={styles.rateproductbtn} onClick={handleClick}>
          Rate Product <FaArrowCircleRight className={styles.iicon} />
        </button>
      </div>
      <div className={styles.rating}>
        <div className={styles.stars}>
          {/* {[1, 2, 3, 4].map((star) => (
            <MdOutlineStarBorder key={star} className={styles.starfilled} />
          ))}
          <MdOutlineStarBorder className={styles.star} /> */}
          {renderStars(product?.avgRatings)}
        </div>
        <span className={styles.reviewcount}>{product?.ratingQty} Reviews</span>
      </div>

      {isRatingform ? (
        <RiviewRating
          style={
            isRatingform
              ? { transform: "scaleX(1)" }
              : { transform: "scaleX(0)" }
          }

          handleClick={handleClick}
        />
      ) : null}

      {review?.map((review, id) => (
        <RiviewSwiperComponent review={review} key={id} />
      ))}
    </div>
  );
};
