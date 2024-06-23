import React, { useState, useEffect } from "react";

const AddReview = ({ userId, activityId }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [message, setMessage] = useState("");
  const [hasReviewed, setHasReviewed] = useState(false);

  useEffect(() => {
    const checkReviewStatus = async () => {
      try {
        const response = await fetch(
          `https://localhost:7148/api/Activities/has-reviewed/${userId}/${activityId}`
        );
        const result = await response.json();
        setHasReviewed(result);
      } catch (error) {
        console.error("Error checking review status:", error);
      }
    };

    checkReviewStatus();
  }, [userId, activityId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      userId: parseInt(userId),
      activityId: parseInt(activityId),
      comment,
      rating: parseFloat(rating).toFixed(1), // 確保評分為小數點後一位
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
        setHasReviewed(true); // 更新 hasReviewed 狀態
      } else {
        const data = await response.json();
        console.error("Error response data:", data);
        setMessage(data.title || "提交評論時發生錯誤");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setMessage("提交評論時發生錯誤");
    }
  };

  return (
    <div className="add-review-form">
      {/*            <h2>新增評論</h2>*/}
      {hasReviewed ? (
        <p>已評論</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>評論:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <label>評分:</label>
            <input
              type="number"
              step="0.1" // 確保輸入步長為0.1
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
              min="1"
              max="5"
            />
          </div>
          <button type="submit">留下評論</button>
        </form>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddReview;
