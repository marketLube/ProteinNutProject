import React from "react";
import styles from "./RiviewRating.module.css";
import { FaArrowCircleRight } from "react-icons/fa";
import { MdOutlineStarBorder } from "react-icons/md";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import ReactStars from "react-stars";

export const RiviewRating = ({ style, handleClick }) => {
  const form = useForm({});
  const { register, handleSubmit, setValue } = form;

  // review submiting logic
  const onSubmitftn = (data) => {
    console.log(data);
    handleClick();
  };

  // const ratingChanged = (newRating) => {
  //   console.log(newRating);
  // };
  const ratingChanged = (newRating) => {
    setValue("rating", newRating);
    console.log("New Rating: ", newRating);
  };

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: 1 }}
      className={styles.productratingcontainer}
      style={style}
    >
      <h2>Rate this product</h2>
      <form onSubmit={handleSubmit(onSubmitftn)}>
        <div className={styles.stars}>
          <ReactStars
            onChange={ratingChanged}
            color2={"#ffd700"}
            size={24}
            {...setValue("rating")}
          />
        </div>

        <div className={styles.forms}>
          <input
            type="text"
            placeholder="Title..."
            //   value={title}
            // onChange={(e) => setTitle(e.target.value)}
            className={`${styles.inputfield} ${styles.titleinput}`}
            {...register("title")}
          />
          <textarea
            type="text"
            placeholder="Description..."
            //   value={description}
            // onChange={(e) => setDescription(e.target.value)}
            className={`${styles.inputfield} ${styles.descriptioninput}`}
            {...register("Description")}
          />
        </div>
        <div className={styles.ratingbutton}>
          <button className={styles.cancelbutton} onClick={handleClick}>
            cancel
          </button>
          <button className={styles.submitbutton}>
            Submit <FaArrowCircleRight className={styles.icn} />
          </button>
        </div>
      </form>
    </motion.div>
  );
};
