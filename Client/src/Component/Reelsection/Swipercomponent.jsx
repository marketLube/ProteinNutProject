import React from "react";
import styles from "./Swipercomponent.module.css";
import InstagramPost from "../Instagram/InstagramPost";
// import { InstagramEmbed } from "react-social-media-embed";

export const Swipercomponent = () => {
  return (
    <div className={styles.reelsdisplay}>
      <InstagramPost />
    </div>
  );
};
