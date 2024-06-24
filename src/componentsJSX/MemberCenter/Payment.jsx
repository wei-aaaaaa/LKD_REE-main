import React from "react";
import "./Payment.css";

const Payment = () => {
  return (
    <div className="payment">
      <h1>付款方式</h1>
      <div className="credit-card">
        <img
          src="src\assets\images\icons\credit.png"
          alt="Credit Card"
          className="credit-card-image"
        />
        <p className="card-number">卡號: 1234 5678 9012 3456</p>
        <p className="expiry-date">有效期: 12/34</p>
      </div>
    </div>
  );
};

export default Payment;
