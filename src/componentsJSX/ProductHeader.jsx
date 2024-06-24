import React from "react";
import styles from "./ProductHeader.module.css";
import HeartButton from "./HeartButton";

const ProductHeader = ({
  title,
  averageRating,
  isFavorite,
  toggleFavorite,
  address,
}) => {
  return (
    <div className={styles.productHeader}>
      <div className={styles.titleAndHeart}>
        <h1 className={styles.productTitle}>{title}</h1>
        <HeartButton isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
      </div>
      <div className={styles.headerBottom}>
        <div className={styles.hashtags}>
          {["熱賣中", "湊團導覽", "時長四小時內"].map((tag, index) => (
            <span key={index} className={styles.hashtag}>
              #{tag}
            </span>
          ))}
        </div>
        {averageRating && (
          <p className={styles.averageRating}>★ {averageRating}</p>
        )}
        <div className={styles.addressContainer}>
          <img src="/src/assets/images/icons/address.png" alt="Address Icon" />
          <p className={styles.address}>{address}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;
