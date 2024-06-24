import React from "react";
import styles from "./PhotoDesc.module.css"; // 引用CSS模組

const PhotoDesc = ({ images }) => {
  return (
    <div className={styles.photoDesc}>
      {images.map((image, index) => (
        <div key={index} className={styles.photoDescItem}>
          <img
            src={image.src}
            alt={`Image ${index + 1}`}
            className={styles.photoImg}
          />
          <p className={styles.photoDescription}>{image.description}</p>
        </div>
      ))}
    </div>
  );
};

export default PhotoDesc;
