import React from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentSuccess.css";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleHomeClick = async () => {
    try {
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
      navigate("/"); // 返回首頁
    } catch (error) {
      console.error("Failed to update order status:", error);
      // 在這裡處理錯誤，例如顯示錯誤訊息給用戶
    }
  };

  return (
    <div className="payment-success">
      <h1>訂購完成</h1>
      <p>感謝您的訂購！</p>
      <button onClick={handleHomeClick}>返回首頁</button>
    </div>
  );
};

export default PaymentSuccess;
