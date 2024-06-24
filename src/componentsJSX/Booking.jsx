import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Booking.module.css";

const Booking = () => {
  const location = useLocation();
  const { selectedCartItems } = location.state || { selectedCartItems: [] };
  const [contactInfo, setContactInfo] = useState({
    lastName: "",
    firstName: "",
    country: "",
    phone: "",
    email: "",
  });

  const [passengerInfo, setPassengerInfo] = useState({
    lastName: "",
    firstName: "",
    birthday: "",
    idType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactInfo({ ...contactInfo, [name]: value });
  };

  const handlePassengerChange = (e) => {
    const { name, value } = e.target;
    setPassengerInfo({ ...passengerInfo, [name]: value });
  };

  const handleCheckout = async () => {
    if (selectedCartItems.length === 0) {
      window.alert("請選擇行程");
      return;
    }

    const requestData = {
      bookingIds: selectedCartItems.map((item) => item.bookingId),
    };

    try {
      const response = await fetch(
        "https://localhost:7148/api/Payment/CreatePayment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (response.ok) {
        const data = await response.text();
        const div = document.createElement("div");
        div.innerHTML = data;
        document.body.appendChild(div);
        const form = document.getElementById("ecpay_form");
        if (form) {
          form.submit();
        } else {
          console.error("表單未找到，無法自動提交");
        }
      } else {
        console.error("Failed to get payment form", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Payment failed");
    }
  };

  const fillDemoData = () => {
    setContactInfo({
      lastName: "陳",
      firstName: "曉明",
      country: "台北",
      phone: "0920123456",
      email: "bbb@gmail.com",
    });
    setPassengerInfo({
      lastName: "陳",
      firstName: "曉明",
      birthday: "86/01/05",
      idType: "F221234567",
    });
  };

  const calculateTotalPrice = () => {
    const total = selectedCartItems.reduce(
      (total, item) => total + item.price * item.member,
      0
    );
    return total.toLocaleString("en-US");
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <div className={styles.bookingInfo}>
            <h2 className={styles.sectionTitle}>填寫資料</h2>
            <div className={styles.bookingDetails}>
              <h3 className={styles.subTitle}>預訂資料</h3>
              {selectedCartItems.map((item) => (
                <div key={item.bookingId} className={styles.bookingItem}>
                  <img
                    className={styles.bookingImage}
                    src={`data:image/jpeg;base64,${item.activity.photo}`}
                    alt={item.activity.name}
                  />
                  <div className={styles.bookingDescription}>
                    <p>{item.activity.name}</p>
                    <p>{item.activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.passengerInfo}>
            <h2 className={styles.sectionTitle}>參加人資料</h2>
            <div className={styles.infoFields}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>姓氏</label>
                <input
                  className={styles.input}
                  type="text"
                  name="lastName"
                  value={passengerInfo.lastName}
                  onChange={handlePassengerChange}
                  placeholder="請填寫"
                />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>名字</label>
                <input
                  className={styles.input}
                  type="text"
                  name="firstName"
                  value={passengerInfo.firstName}
                  onChange={handlePassengerChange}
                  placeholder="請填寫"
                />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>生日</label>
                <input
                  className={styles.input}
                  type="text"
                  name="birthday"
                  value={passengerInfo.birthday}
                  onChange={handlePassengerChange}
                  placeholder="請選擇"
                />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>身份證件類型</label>
                <input
                  className={styles.input}
                  type="text"
                  name="idType"
                  value={passengerInfo.idType}
                  onChange={handlePassengerChange}
                  placeholder="請選擇"
                />
              </div>
            </div>
          </div>

          <div className={styles.contactInfo}>
            <h2 className={styles.sectionTitle}>聯絡資料</h2>
            <p className={styles.sectionSubtitle}>如訂單有變動，我們將通知您</p>
            <div className={styles.infoFields}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>姓氏</label>
                <input
                  className={styles.input}
                  type="text"
                  name="lastName"
                  value={contactInfo.lastName}
                  onChange={handleChange}
                  placeholder="請填寫"
                />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>名字</label>
                <input
                  className={styles.input}
                  type="text"
                  name="firstName"
                  value={contactInfo.firstName}
                  onChange={handleChange}
                  placeholder="請填寫"
                />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>國家/地區</label>
                <input
                  className={styles.input}
                  type="text"
                  name="country"
                  value={contactInfo.country}
                  onChange={handleChange}
                  placeholder="請選擇"
                />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>手機號碼</label>
                <input
                  className={styles.input}
                  type="text"
                  name="phone"
                  value={contactInfo.phone}
                  onChange={handleChange}
                  placeholder="請填寫"
                />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>
                  電子信箱（接收訂單最新資訊）
                </label>
                <input
                  className={styles.input}
                  type="email"
                  name="email"
                  value={contactInfo.email}
                  onChange={handleChange}
                  placeholder="請填寫"
                />
              </div>
            </div>
          </div>

          <div className={styles.confirmationSection}>
            <p className={styles.confirmationText}>
              我了解並同意 Lookday 服務條款與隱私權政策
            </p>
            <div className={styles.warningMessage}>
              請確認資料填寫無誤，訂單送出後可能無法更改
            </div>
            <p className={styles.finalNote}>
              前往付款後，訂單即送出，請於下一步選擇付款方式
            </p>
            <button className={styles.submitButton} onClick={handleCheckout}>
              前往付款
            </button>
            <div className="cart-summary">
              <p>
                Total: <span id="total-price">NTD {calculateTotalPrice()}</span>
              </p>
            </div>
            <button className={styles.demoButton} onClick={fillDemoData}>
              DEMO
            </button>
          </div>
        </div>

        <div className={styles.rightContainer}>
          {selectedCartItems.map((item) => (
            <div key={item.bookingId} className={styles.summaryBlock}>
              <h3 className={styles.summaryTitle}>{item.activity.name}</h3>
              <p>{item.activity.date}</p>
              <p>人數：成人 x {item.member}</p>
              <p>總價：NTD {item.price * item.member}</p>
            </div>
          ))}
          <div className={styles.pricingBlock}>
            <p className={styles.finalPrice}>
              付款金額：NTD {calculateTotalPrice()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
