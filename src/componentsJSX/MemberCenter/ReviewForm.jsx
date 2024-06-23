import React, { useState, useEffect } from "react";
import "./ReviewForm.css";
import PropTypes from "prop-types";

const ReviewForm = ({ userId, activityId, onClose }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1.0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        "https://localhost:7148/api/Activities/add-review",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            activityId: activityId,
            comment: comment,
            rating: parseFloat(rating), // �T�O�o�̬O�B�I��
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setSuccess("Review added successfully.");
      setComment("");
      setRating(1.0);
      onClose(); // ��������
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="review-form">
      <h2>�K�[����</h2>
      {error && <p className="error">Error: {error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          ����:
          <input
            type="number"
            step="0.1"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </label>
        <label>
          ����:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
        <div className="form-buttons">
          <button type="submit">�������</button>
          <button type="button" onClick={onClose}>
            ����
          </button>
        </div>
      </form>
    </div>
  );
};

ReviewForm.propTypes = {
  userId: PropTypes.number.isRequired,
  activityId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ReviewForm;
