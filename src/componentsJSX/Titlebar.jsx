import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./Titlebar.css";
import logo from "../assets/Logo.png"; // 確保你有一個 logo.png 文件在對應的路徑
import LoginForm from "./LoginForm"; // 引入 LoginForm 組件
import { colors } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import RecentViewedDropdown from "./RecentViewedDropdown";

const Titlebar = () => {
  const [history, sethistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false); // 添加狀態來控制模態框顯示
  const [isLogin, setLoginin] = useState("");
  const [showRecentViewed, setShowRecentViewed] = useState(false); // 添加狀態來控制下拉選單顯示
  const recentViewedRef = useRef(null); // 添加引用來監聽點擊事件
  const navigate = useNavigate();

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      const queries = searchQuery
        .split(",")
        .map((query) => query.trim())
        .join("&query=");
      navigate(`/search?query=${queries}`);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const toggleRecentViewed = () => {
    getUserHistory();
    setShowRecentViewed(!showRecentViewed);
  };

  const getUserHistory = async () => {
    const response = await fetch(
      "https://localhost:7148/api/BrowsingHistoryAPI/GetByUser",
      {
        method: "get",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Http error! Status: ${response.status}`);
    }
    const data = await response.json();
    sethistory(data);
    console.log(data);
    console.log(history);
  };

  useEffect(() => {
    // 監聽點擊事件來隱藏下拉菜單
    const handleClickOutside = (event) => {
      if (
        recentViewedRef.current &&
        !recentViewedRef.current.contains(event.target)
      ) {
        setShowRecentViewed(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [recentViewedRef]);

  useEffect(() => {
    // expire  username
    const _token = localStorage.getItem("token")?.slice(7);
    const token = _token ? jwtDecode(_token) : "";
    // const loginUsername = localStorage.getItem("name");
    // const now = Date.now();
    const name_google = token?.name;
    const name =
      token?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    console.log("name", name, token.exp);
    token.exp > Date.now() / 1000
      ? setLoginin(name || name_google)
      : setLoginin("");
    // console.log("loginExpireloginExpire", loginExpire, loginUsername);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
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
            <button
              className="titlebar-button"
              onClick={!isLogin ? handleOpenModal : ""}
            >
              客服中心
            </button>
          </Link>
          <Link to="/cart">
            <button
              className="titlebar-button"
              onClick={!isLogin ? handleOpenModal : ""}
            >
              購物車
            </button>
          </Link>
          <Link to="/favorite">
            <button
              className="titlebar-button"
              onClick={!isLogin ? handleOpenModal : ""}
            >
              收藏
            </button>
          </Link>

          <div
            className="recent-viewed-dropdown-container"
            ref={recentViewedRef}
          >
            <button
              className="titlebar-button"
              onClick={!isLogin ? handleOpenModal : toggleRecentViewed}
            >
              最近逛過
            </button>
            {showRecentViewed && <RecentViewedDropdown history={history} />}
          </div>
          {/* {isLogin && (
            <Link to="/Member">
              <button
                className="titlebar-button"
                // onClick={!isLogin ? handleOpenModal : ""}
              >
                會員中心
              </button>
            </Link>
          )} */}
          {isLogin ? (
            <Link to="/Member">
              <button className="titlebar-button">{isLogin}</button>
            </Link>
          ) : (
            <button className="titlebar-button" onClick={handleOpenModal}>
              登入
            </button>
          )}
          {isLogin && (
            <button className="titlebar-button" onClick={handleLogout}>
              登出
            </button>
          )}
        </div>
      </div>
      <LoginForm show={showModal} onClose={handleCloseModal} />
    </div>
  );
};

export default Titlebar;
