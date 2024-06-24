import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RecentViewedDropdown.css"; // 為下拉選單設計樣式

const RecentViewedDropdown = ({ history }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/productpage/${id}`);
  };

  return (
    <div className="recent-viewed-dropdown">
      {history.map((history) => (
        <div
          key={history.browsingHistoryId}
          className="recent-viewed-dropdown__item"
          onClick={() => handleClick(history.activityId)} // 將點擊事件放在整個item上
        >
          <img src={`data:image/png;base64,${history.photo[0]}`} alt="Item 1" />
          <div className="recent-viewed-dropdown__info">
            <p>{history.name}</p>
            <p className="recent-viewed-dropdown__price">${history.price}起</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentViewedDropdown;
