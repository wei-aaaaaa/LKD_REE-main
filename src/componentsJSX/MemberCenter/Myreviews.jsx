﻿import React, { useEffect, useState } from "react";
import "./Myreviews.css";

const Myreviews = ({ userId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://localhost:7148/api/Activities/user-reviews/${userId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        setReviews(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="order-list">
      <h1>我的評價</h1>
      {loading ? null : reviews.length === 0 ? (
        <p>目前沒有評價記錄。</p>
      ) : (
        reviews.map((review, index) => (
          <div className="order-item" key={`${review.activityId}-${index}`}>
            <h2>{review.activityName}</h2>
            <p>{review.comment}</p>
            <p className="fontcolor">評分: {review.rating.toFixed(1)}</p>{" "}
            {/* 格式化評分 */}
            <button>查看詳細資訊</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Myreviews;
