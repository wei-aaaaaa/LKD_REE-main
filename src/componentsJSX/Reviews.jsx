import React, { useState } from "react";
import "./Reviews.css";

const Reviews = ({ reviews }) => {
  const [filteredReviews, setFilteredReviews] = useState(reviews);

  console.log("Reviews props:", reviews); // 打印整个 reviews 数组

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
          {filteredReviews && filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <div key={review.reviewId} className="review-card">
                {review.userPic ? (
                  <img
                    src={`data:image/png;base64,${review.userPic}`}
                    alt="User"
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
          <a href="#">View All Reviews</a>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
