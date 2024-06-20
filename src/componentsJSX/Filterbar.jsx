import React from "react";
import { useNavigate } from "react-router-dom";
import "./Filterbar.css";

// FilterItem component: 用於呈現每個篩選項目
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

// GridDropdownMenu component: 用於顯示以網格格式呈現的下拉選單
const GridDropdownMenu = ({ items }) => {
  const navigate = useNavigate();

  // 處理項目點擊事件，導航到對應的搜尋頁面
  const handleItemClick = (label) => {
    navigate(`/search?query=${label}`);
    window.scrollTo(0, 0); // 滾動到頁面頂部
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
          <a>{item.label}</a>
        </li>
      ))}
    </ul>
  );
};

// ListDropdownMenu component: 用於顯示以列表格式呈現的下拉選單
const ListDropdownMenu = ({ items }) => {
  const navigate = useNavigate();

  // 處理項目點擊事件，導航到對應的搜尋頁面
  const handleItemClick = (label) => {
    navigate(`/search?query=${label}`);
    window.scrollTo(0, 0); // 滾動到頁面頂部
  };

  return (
    <ul className="dropdown-menu list">
      {items.map((item, index) => (
        <li key={index} onClick={() => handleItemClick(item.label)}>
          {item.label}
        </li>
      ))}
    </ul>
  );
};

// FilterBar component: 包含所有篩選項目的主組件
const FilterBar = () => {
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
      <FilterItem title="全部分類" isGrid={false}>
        <ListDropdownMenu
          items={[
            { label: "分類1" },
            { label: "分類2" },
            { label: "分類3" }
          ]}
        />
      </FilterItem>
      <FilterItem title="行程&體驗" isGrid={false}>
        <ListDropdownMenu
          items={[
            { label: "觀光" },
            { label: "按摩" },
            { label: "文化體驗" },
            { label: "水上活動" },
            { label: "戶外運動" },
            { label: "溫泉" },
            { label: "郵輪" }
          ]}
        />
      </FilterItem>
      <FilterItem title="景點門票" isGrid={false}>
        <ListDropdownMenu
          items={[
            { label: "主題樂園" },
            { label: "水上活動" },
            { label: "博物館" },
            { label: "公園&花園" },
            { label: "動物園&水族館" },
            { label: "纜車" },
            { label: "觀景台" },
            { label: "歷史景點" },
            { label: "遊樂場" }
          ]}
        />
      </FilterItem>
      {/*<FilterItem title="飯店" isGrid={false}>*/}
      {/*    <ListDropdownMenu items={[*/}
      {/*        { label: "飯店1" },*/}
      {/*        { label: "飯店2" },*/}
      {/*        { label: "飯店3" }*/}
      {/*    ]} />*/}
      {/*</FilterItem>*/}
      <FilterItem title="交通" isGrid={false}>
        <ListDropdownMenu
          items={[
            { label: "交通1" },
            { label: "交通2" },
            { label: "交通3" }
          ]}
        />
      </FilterItem>
      <FilterItem title="美食品嚐" isGrid={false}>
        <ListDropdownMenu
          items={[
            { label: "美食1" },
            { label: "美食2" },
            { label: "美食3" }
          ]}
        />
      </FilterItem>
      <FilterItem title="台灣高鐵" isGrid={false}>
        <ListDropdownMenu
          items={[
            { label: "高鐵1" },
            { label: "高鐵2" },
            { label: "高鐵3" }
          ]}
        />
      </FilterItem>
    </div>
  );
};

export default FilterBar;
