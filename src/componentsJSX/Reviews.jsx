import React, { useState } from "react";
import "./Reviews.css";

const Reviews = ({ reviews }) => {
  const [filteredReviews, setFilteredReviews] = useState(reviews);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log("Reviews props:", reviews);

  const filterReviews = (rating) => {
    if (rating === "All") {
      setFilteredReviews(reviews);
    } else {
      const minRating = rating;
      const maxRating = rating + 0.9;
      const filtered = reviews.filter(
        (review) => review.rating >= minRating && review.rating <= maxRating
      );
      setFilteredReviews(filtered);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="reviews">
      <div className="reviews-header">
        <div className="reviews-title">
          <i className="reviews-icon">★</i>
          <h2>評論</h2>
        </div>
        <div className="total-reviews">({filteredReviews.length} reviews)</div>
      </div>
      <div className="reviews-content">
        <div className="review-filters">
          <button onClick={() => filterReviews("All")}>All</button>
          <button onClick={() => filterReviews(5)}>5 Star</button>
          <button onClick={() => filterReviews(4)}>4 Star</button>
          <button onClick={() => filterReviews(3)}>3 Star</button>
          <button onClick={() => filterReviews(2)}>2 Star</button>
          <button onClick={() => filterReviews(1)}>1 Star</button>
        </div>
        <div className="individual-reviews">
          {Array.isArray(filteredReviews) && filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <div key={review.reviewId} className="review-card">
                {review.userPic ? (
                  <img
                    src={`data:image/png;base64,${review.userPic}`}
                    alt={`${review.username}'s avatar`}
                    className="user-image"
                  />
                ) : (
                  <div className="user-placeholder">Placeholder</div>
                )}
                <div className="review-content">
                  <div className="review-user">
                    <strong>{review.username}</strong>
                    <span className="review-date">{review.date}</span>
                  </div>
                  <div className="review-score">
                    <strong>★</strong> {review.rating}
                  </div>
                  <div className="review-text">
                    <strong>評論:</strong> {review.comment}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>目前沒有評論。</p>
          )}
        </div>
        <div className="view-all-reviews">
          <button onClick={openModal}>View All Reviews</button>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>All Reviews</h2>
            <button onClick={closeModal} className="close-modal">
              Close
            </button>
            <div className="all-reviews">
              {reviews.map((review) => (
                <div key={review.reviewId} className="review-card">
                  {review.userPic ? (
                    <img
                      src={`data:image/png;base64,${review.userPic}`}
                      alt={`${review.username}'s avatar`}
                      className="user-image"
                    />
                  ) : (
                    <div className="user-placeholder">Placeholder</div>
                  )}
                  <div className="review-content">
                    <div className="review-user">
                      <strong>{review.username}</strong>
                      <span className="review-date">{review.date}</span>
                    </div>
                    <div className="review-score">
                      <strong>★</strong> {review.rating}
                    </div>
                    <div className="review-text">
                      <strong>評論:</strong> {review.comment}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
