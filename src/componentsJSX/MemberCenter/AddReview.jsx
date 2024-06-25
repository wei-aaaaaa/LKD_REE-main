﻿﻿import React, { useState, useEffect } from "react";

const AddReview = ({ userId, activityId }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [message, setMessage] = useState("");
  const [hasReviewed, setHasReviewed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const checkReviewStatus = async () => {
      try {
        const response = await fetch(
          `https://localhost:7148/api/Activities/has-reviewed/${userId}/${activityId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setHasReviewed(result);
      } catch (error) {
        console.error("Error checking review status:", error);
        setMessage("無法檢查評論狀態，請稍後再試。");
      }
    };

    checkReviewStatus();
  }, [userId, activityId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    const reviewData = {
      userId: parseInt(userId),
      activityId: parseInt(activityId),
      comment,
      rating: parseFloat(parseFloat(rating).toFixed(1)),
    };
  
    console.log("Submitting review data:", reviewData);
  
    try {
      const response = await fetch(
        "https://localhost:7148/api/Activities/add-review",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reviewData),
        }
      );
  
      if (response.ok) {
        setMessage("評論提交成功");
        setHasReviewed(true);
        alert("評論提交成功");
      } else {
        const data = await response.json();
        console.error("Error response data:", data);
        setMessage(data.title || "提交評論時發生錯誤");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setMessage("提交評論時發生錯誤");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="add-review-form">
      {hasReviewed ? (
        <p>已評論</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>留下評論:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label>評分分數:</label>
            <input
              type="number"
              step="0.1"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
              min="1"
              max="5"
            />
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "提交中..." : "留下評論"}
          </button>
        </form>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddReview;
