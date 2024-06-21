import React from "react";
import "./ProductDesc.css";

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
            <h2 key={index} className="header">
              {item.content}
            </h2>
          );
        case "paragraph":
          return (
            <p key={index} className="paragraph">
              {item.content}
            </p>
          );
        default:
          return (
            <p key={index} className="paragraph">
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
    <div className="product-info">
      <div className="product-price">價格：NT$ {price}</div>
      <div className="product-date">日期：{date}</div>
      <div className="product-location">剩餘名額：{remaining}</div>
      <div className="product-description">
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
