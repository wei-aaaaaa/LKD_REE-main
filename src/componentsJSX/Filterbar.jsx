import React from "react";
import { useNavigate } from "react-router-dom";
import "./Filterbar.css";

const FilterItem = ({ title, children, isGrid }) => {
  return (
    <div className="filter-item">
      <button className="filter-button">{title}</button>
      <div className="dropdown">
        <div className={`dropdown-content ${isGrid ? "grid" : "list"}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

const GridDropdownMenu = ({ items }) => {
  const navigate = useNavigate();

  const handleItemClick = (label) => {
    navigate(`/search?query=${label}`);
  };

  return (
    <ul className="dropdown-menu grid">
      {items.map((item, index) => (
        <li
          key={index}
          className="location"
          onClick={() => handleItemClick(item.label)}
        >
          {item.imgSrc && <img src={item.imgSrc} alt={item.label} />}
          <a href="#">{item.label}</a>
        </li>
      ))}
    </ul>
  );
};

const FilterBar = () => {
  const navigate = useNavigate();

  const handleButtonClick = (label) => {
    navigate(`/search?query=${label}`);
  };

  return (
    <div className="filter-bar">
      <FilterItem title="探索目的地" isGrid={true}>
        <GridDropdownMenu
          items={[
            { imgSrc: "/src/assets/images/areas/taipei.jpg", label: "台北" },
            { imgSrc: "/src/assets/images/areas/taichung.jpg", label: "台中" },
            { imgSrc: "/src/assets/images/areas/hualien.jpg", label: "花蓮" },
            { imgSrc: "/src/assets/images/areas/Taidon.jpg", label: "台東" },
            { imgSrc: "/src/assets/images/areas/tainan.jpg", label: "台南" },
            { imgSrc: "/src/assets/images/areas/yilan.jpg", label: "宜蘭" },
            { imgSrc: "/src/assets/images/areas/yuling.jpg", label: "雲林" },
            { imgSrc: "/src/assets/images/areas/pingdon.jpg", label: "屏東" },
            { imgSrc: "/src/assets/images/areas/kaohsiung.jpg", label: "高雄" },
          ]}
        />
      </FilterItem>
      <button
        className="filter-button"
        onClick={() => handleButtonClick("台北")}
      >
        台北
      </button>
      <button
        className="filter-button"
        onClick={() => handleButtonClick("台中")}
      >
        台中
      </button>
      <button
        className="filter-button"
        onClick={() => handleButtonClick("台南")}
      >
        台南
      </button>
      <button
        className="filter-button"
        onClick={() => handleButtonClick("高雄")}
      >
        高雄
      </button>
      <button
        className="filter-button"
        onClick={() => handleButtonClick("台東")}
      >
        台東
      </button>
    </div>
  );
};

export default FilterBar;
