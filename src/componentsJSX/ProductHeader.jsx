import React from "react";
import "./ProductHeader.css";
import HeartButton from "./HeartButton";

const ProductHeader = ({ title, averageRating, isFavorite, toggleFavorite, address }) => {
  return (
    <div className="product-header">
      <div className="title-and-heart">
        <h1 className="product-title">{title}</h1>
        <HeartButton isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
      </div>
      <div className="header-bottom">
        <div className="hashtags">
          {['熱賣中', '湊團導覽', '時長三小時內'].map((tag, index) => (
            <span key={index} className="hashtag">#{tag}</span>
          ))}
        </div>
        {averageRating && <p className="average-rating">★ {averageRating}</p>}
        <div className="address-container">
          <img src="/src/assets/images/icons/address.png" alt="Address Icon" />
          <p className="address">{address}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;
