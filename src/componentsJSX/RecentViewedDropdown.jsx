import React, { useEffect } from "react";
import "./RecentViewedDropdown.css"; // 為下拉選單設計樣式



const RecentViewedDropdown = ({history}) => {

  const handleClick = (id) => {
    navigate(`/productpage/${id}`);
  };

  return (
    <div className="recent-viewed-dropdown">
      {history.map(history=>(
        <div className="recent-viewed-dropdown__item">
        <img src={`data:image/png;base64,${history.photo[0]}`} alt="Item 1" />
        <div className="recent-viewed-dropdown__info">
          <p>{history.name}</p>
          <p className="recent-viewed-dropdown__price">{history.price}</p>
        </div>
      </div>
      ))}
      {/* <div className="recent-viewed-dropdown__item">
        <img src="path-to-image1.jpg" alt="Item 1" />
        <div className="recent-viewed-dropdown__info">
          <p>日本環球影城門票</p>
          <p className="recent-viewed-dropdown__price">NT$ 1690</p>
        </div>
      </div>
      <div className="recent-viewed-dropdown__item">
        <img src="path-to-image2.jpg" alt="Item 2" />
        <div className="recent-viewed-dropdown__info">
          <p>包車遊覽 | 新北景點一日遊</p>
          <p className="recent-viewed-dropdown__price">NT$ 3800</p>
        </div>
      </div>
      <div className="recent-viewed-dropdown__item">
        <img src="path-to-image3.jpg" alt="Item 3" />
        <div className="recent-viewed-dropdown__info">
          <p>台北免費步行導覽：歷史路線</p>
          <p className="recent-viewed-dropdown__price">NT$ 10</p>
        </div>
      </div>
      <div className="recent-viewed-dropdown__item">
        <img src="path-to-image4.jpg" alt="Item 4" />
        <div className="recent-viewed-dropdown__info">
          <p>十分瀑布 / 猴硐貓村</p>
          <p className="recent-viewed-dropdown__price">NT$ 479</p>
        </div>
      </div> */}
    </div>
  );
};

export default RecentViewedDropdown;
