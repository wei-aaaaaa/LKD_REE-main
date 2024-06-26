import React from "react";
import { useNavigate } from "react-router-dom";
import "./Paymentsuccess.css";

const PaymentSuccess = () => {
  // 用於導航到其他頁面
  const navigate = useNavigate();

  // 處理按下"回到首頁"按鈕的事件
  const handleHomeClick = async () => {
    try {
      // 發送請求更新訂單狀態
      const response = await fetch(
        "https://localhost:7148/api/BookingStatusAPI/update-order-status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response status:", response.status); // 添加這行檢查狀態碼

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      // 更新成功後導向首頁
      console.log("Navigating to home"); // 添加這行檢查 navigate 是否被調用
      navigate("/"); // 成功後導航到首頁
    } catch (error) {
      console.error("Failed to update order status:", error);
      // 在這裡處理錯誤，例如顯示錯誤訊息給用戶
    }
  };

  return (
    <div className="payment-success">
      <h1 className="success-title">訂購完成</h1>
      <p>感謝您對LOOKDAY的支持！</p>
      <p>LOOKDAY祝您旅途愉快！</p>
      <button className="home-button" onClick={handleHomeClick}>
        回到首頁
      </button>
    </div>
  );
};

export default PaymentSuccess;
