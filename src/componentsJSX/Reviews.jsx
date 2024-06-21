import React from "react";
import "./Reviews.css";

const Reviews = ({ reviews }) => {
  console.log("Reviews props:", reviews); // 打印整个 reviews 数组
  return (
    <div className="reviews">
      <div className="reviews-header">
        <div className="reviews-title">
          <i className="reviews-icon">★</i>
          <h2>評論</h2>
        </div>
        <div className="total-reviews">({reviews.length} reviews)</div>
      </div>
      <div className="reviews-content">
        <div className="review-filters">
          <button>All</button>
          <button>5 Star</button>
          <button>4 Star</button>
          <button>3 Star</button>
          <button>2 Star</button>
          <button>1 Star</button>
        </div>
        <div className="individual-reviews">
          {reviews && reviews.length > 0 ? (
            reviews.map((review) => (
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
