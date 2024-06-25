// LogoAnimation.js
import React from "react";
import "./LogoAnimation.css"; // 引入動畫樣式
import logo from "../assets/images/adHome/LogoRegister.png"; // 使用import語句引用圖片

const LogoAnimation = () => {
  return (
    <div className="logo-animation">
      <img src={logo} alt="Logo" />
    </div>
  );
};

export default LogoAnimation;
