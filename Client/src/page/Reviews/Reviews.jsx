import React, { useState, useEffect } from "react";
import MainTitle from "../../Components/smallcomponents/MainTitle";
import ReveiwsFooter from "./components/ReveiwsFooter";
import ReviewsHeader from "./components/ReviewsHeader";
import ReviewsTable from "./components/ReviewsTable";
import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";

function Reviews() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsChunks, setReviewsChunks] = useState([]);

  const handleItemSelect = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  const {
    data: reviews,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => api.get("/reviews").then((data) => data.data.docs),
  });

  console.log(reviews, "reveiws");

  const btnDisable = reviewsChunks.length < 4;

  useEffect(() => {
    if (reviews) {
      const splitReviewsIntoChunks = (reviews, chunkSize) => {
        const chunks = [];
        for (let i = 0; i < reviews.length; i += chunkSize) {
          chunks.push(reviews.slice(i, i + chunkSize));
        }
        return chunks;
      };

      // Split reviews into chunks of 4 (or any size you want)
      const chunks = splitReviewsIntoChunks(reviews, 4);
      setReviewsChunks(chunks);
    }
  }, [reviews]);

  return (
    <main className="reviews">
      <MainTitle>Reviews</MainTitle>
      <div className="main-body">
        <ReviewsHeader />
        <ReviewsTable
          reviewsChunks={reviewsChunks}
          currentPage={currentPage}
          selectedItems={selectedItems}
          onItemSelect={handleItemSelect}
          isLoading={isLoading}
          error={error}
        />
        <ReveiwsFooter
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={reviewsChunks.length} // Total pages based on chunks
          selectedItems={selectedItems}
          // btnDisable = {btnDisable}
        />
      </div>
    </main>
  );
}

export default Reviews;
