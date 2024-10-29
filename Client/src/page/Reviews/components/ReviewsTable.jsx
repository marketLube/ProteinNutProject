import "@fortawesome/fontawesome-free/css/all.min.css";
import moment from "moment";
import Spinner from "../../../Components/Spinner/Spinner";

const ReviewsTable = ({
  selectedItems,
  onItemSelect,
  reviewsChunks,
  currentPage,
  isLoading,
  error,
}) => {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Full stars
    const hasHalfStar = rating % 1 !== 0; // Check if there's a half star
    const emptyStars = 5 - Math.ceil(rating); // Remaining empty stars

    return (
      <>
        {Array(fullStars)
          .fill(0)
          .map((_, i) => (
            <i key={`full-${i}`} className="fas fa-star filled"></i>
          ))}
        {hasHalfStar && (
          <i key="half-star" className="fas fa-star-half-alt filled"></i>
        )}
        {Array(emptyStars)
          .fill(0)
          .map((_, i) => (
            <i key={`empty-${i}`} className="far fa-star"></i>
          ))}
      </>
    );
  };

  // Get the reviews for the current page (0-based index)
  const reviews = reviewsChunks[currentPage - 1] || [];

  return (
    <div className="reviews__table">
      <div className="reviews__header">
        <div className="reviews__title">
          <h2>Latest Accepted Reviews</h2>
        </div>
      </div>
      <table className="main_table">
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                {/* <div className={styles.spinnerContainer}>
                <div className={styles.spinner}></div>
              </div> */}
                <Spinner />
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td
                colSpan="100%"
                style={{ textAlign: "center", padding: "20px" }}
              >
                <h1>{error}</h1>
              </td>
            </tr>
          ) : reviews?.length > 0 ? (
            reviews.map((review, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(index)}
                    onChange={() => onItemSelect(index)}
                  />
                </td>
                <td className="reviews__name-email">
                  <div className="customer-name">{review?.user?.name}</div>
                  <div>{review?.user?.email}</div>
                </td>
                <td>
                  <div>
                    {renderStars(review?.rating)}
                    <p>({review?.product?.ratingQty})</p>
                  </div>
                </td>
                <td className="review-comment">{review?.message}</td>
                <td className="reviews__product-date">
                  <div className="product-name">{review?.product?.name}</div>
                  <div>
                    {moment(review?.createdAt).format("DD.MM.YY hh:mm a")}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No reviews available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewsTable;
