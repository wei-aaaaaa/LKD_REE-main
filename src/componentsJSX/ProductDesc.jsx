import React from "react";
import styles from "./ProductDesc.module.css";

const ProductDesc = ({
  price,
  date,
  remaining,
  description,
  descriptionJson,
}) => {
  // 根据描述类型渲染对应的 HTML 元素
  const renderDescription = (descriptionItems) => {
    return descriptionItems.map((item, index) => {
      switch (item.type) {
        case "header":
          return (
            <h2 key={index} className={styles.header}>
              {item.content}
            </h2>
          );
        case "paragraph":
          return (
            <p key={index} className={styles.paragraph}>
              {item.content}
            </p>
          );
        default:
          return (
            <p key={index} className={styles.paragraph}>
              {item.content}
            </p>
          ); // 默认渲染为段落
      }
    });
  };

  if (!price || !date || !remaining) {
    return <div>Loading...</div>; // 确保有必要的数据
  }

  return (
    <div className={styles.productInfo}>
      <div className={styles.productPrice}>價格：NT$ {price}</div>
      <div className={styles.productDate}>日期：{date}</div>
      <div className={styles.productLocation}>剩餘名額：{remaining}</div>
      <div className={styles.productDescription}>
        <h2>活動詳情</h2>
        {descriptionJson && descriptionJson.length > 0 ? (
          renderDescription(descriptionJson)
        ) : (
          <p>{description}</p>
        )}
      </div>
    </div>
  );
};

export default ProductDesc;
