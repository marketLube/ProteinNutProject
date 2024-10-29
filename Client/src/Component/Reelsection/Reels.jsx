import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  Navigation,
  Pagination,
  Mousewheel,
  A11y,
  Autoplay,
} from "swiper/modules";
import styles from "./Reels.module.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import InstagramPost from "../Instagram/InstagramPost";
import { useSelector } from "react-redux";

export const Reels = () => {
  const { isMobile } = useSelector((state) => state.endpoint);
  const slides = isMobile ? 1 : 3;
  return (
    <Swiper
      modules={[Navigation, Pagination, Mousewheel, A11y, Autoplay]}
      spaceBetween={0}
      slidesPerView={slides}
      autoplay={
        !isMobile
          ? {
              delay: 1000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }
          : false
      }
      speed={1500}
      className={styles.reels}
      loop={false}
      mousewheel={false}
      pagination={{ clickable: true }}
      onSwiper={(swiper) => {
        // Add event listeners for mouse enter and leave
        swiper.el.addEventListener("mouseenter", () => {
          swiper.autoplay.stop(); // Pause autoplay on hover
        });
        swiper.el.addEventListener("mouseleave", () => {
          swiper.autoplay.start(); // Resume autoplay on mouse leave
        });
      }}
    >
      <SwiperSlide>
        <InstagramPost />
      </SwiperSlide>
      <SwiperSlide>
        <InstagramPost />
      </SwiperSlide>
      <SwiperSlide>
        <InstagramPost />
      </SwiperSlide>
      <SwiperSlide>
        <InstagramPost />
      </SwiperSlide>
      <SwiperSlide>
        <InstagramPost />
      </SwiperSlide>
      <SwiperSlide>
        <InstagramPost />
      </SwiperSlide>
    </Swiper>
  );
};
