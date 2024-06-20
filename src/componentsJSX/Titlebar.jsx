import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Titlebar.css";
import logo from "../assets/Logo.png"; // 確保 logo.png 的路徑正確
import LoginForm from "./LoginForm"; // 引入 LoginForm 組件
import RecentViewedDropdown from "./RecentViewedDropdown"; // 引入下拉選單組件

const Titlebar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showRecentViewed, setShowRecentViewed] = useState(false);
  const navigate = useNavigate();

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter" && searchQuery.trim()) {
      const currentUrlParams = new URLSearchParams(window.location.search);
      if (currentUrlParams.has('query')) {
        currentUrlParams.delete('query'); // 清除已有的 query 參數
      }
      const queries = searchQuery.split(",").map(query => query.trim());
      queries.forEach(query => currentUrlParams.append('query', query));
      navigate(`/search?${currentUrlParams.toString()}`);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const toggleRecentViewed = () => {
    setShowRecentViewed(!showRecentViewed);
  };

  return (
    <div className="titlebar-container">
      <div className="titlebar">
        <div className="titlebar-left">
          <img src={logo} alt="Logo" className="logo" />
          <Link to="/" className="company-name">
            LOOKDAY
          </Link>
          <input
            type="text"
            placeholder="Search..."
            className="search-bar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
        </div>
        <div className="titlebar-right">
          <Link to="/contact">
            <button className="titlebar-button">客服中心</button>
          </Link>
          <Link to="/cart">
            <button className="titlebar-button">購物車</button>
          </Link>
          <Link to="/favorite">
            <button className="titlebar-button">收藏</button>
          </Link>
          <Link to="/member">
            <button className="titlebar-button">會員中心</button>
          </Link>
          <div className="recent-viewed-dropdown-container">
            <button className="titlebar-button" onClick={toggleRecentViewed}>
              最近逛過
            </button>
            {showRecentViewed && <RecentViewedDropdown />}
          </div>
          <button className="titlebar-button" onClick={handleOpenModal}>
            登入
          </button>
        </div>
      </div>
      <LoginForm show={showModal} onClose={handleCloseModal} />
    </div>
  );
};

export default Titlebar;
