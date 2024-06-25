﻿import React, { useState, useEffect } from "react";
import Rating from "../Rating"; // 引入Rating组件
import { ToastContainer, toast, Flip, Zoom, Bounce } from "react-toastify";
import "./AddReview.css"; // 引入CSS文件

const AddReview = ({ userId, activityId }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("0.0"); // 初始化评分为0.0
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
      rating: parseFloat(rating), // 确保为浮点数
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
        toast.success("評論提交成功", {
          autoClose: 3000,
          position: "top-center",
        });
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
      <ToastContainer />
      {hasReviewed ? (
        <div>
          <img
            src="src\assets\images\icons\Reviewed.png"
            alt="已評論"
            className="reviewed-icon"
          />
          <span>已評論</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>留下評論：</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group rating-group">
            <label>評分分數:</label>
            <Rating rating={rating} setRating={setRating} />
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
