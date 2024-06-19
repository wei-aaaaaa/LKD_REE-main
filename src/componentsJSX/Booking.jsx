// src/componentsJSX/Booking.jsx
import React, { useState } from "react";
import styles from "./Booking.module.css";

const Booking = () => {
  const [contactInfo, setContactInfo] = useState({
    lastName: "",
    firstName: "",
    country: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactInfo({ ...contactInfo, [name]: value });
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.mainContainer}>
        {/* Left Side: Booking Information and Forms */}
        <div className={styles.leftContainer}>
          {/* Booking Info */}
          <div className={styles.bookingInfo}>
            <h2 className={styles.sectionTitle}>填寫資料</h2>
            <div className={styles.bookingDetails}>
              <h3 className={styles.subTitle}>預訂資料</h3>
              <div className={styles.bookingItem}>
                <img
                  className={styles.bookingImage}
                  src="path/to/your/image.jpg" // 替换为实际图片路径
                  alt="Booking"
                />
                <div className={styles.bookingDescription}>
                  <p>野柳&九份&十分&十分瀑布&黃金瀑布一日遊</p>
                  <p>野柳&九份&十分&十分瀑布&黃金瀑布一日遊（西門町出發）</p>
                </div>
              </div>
            </div>
          </div>

          {/* Passenger Info */}
          <div className={styles.passengerInfo}>
            <h2 className={styles.sectionTitle}>參加人資料</h2>
            <button className={styles.addButton}>+ 新增</button>
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
                <label className={styles.label}>生日</label>
                <input
                  className={styles.input}
                  type="text"
                  name="birthday"
                  value={contactInfo.birthday}
                  onChange={handleChange}
                  placeholder="請選擇"
                />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>身份證件類型</label>
                <input
                  className={styles.input}
                  type="text"
                  name="idType"
                  value={contactInfo.idType}
                  onChange={handleChange}
                  placeholder="請選擇"
                />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className={styles.contactInfo}>
            <h2 className={styles.sectionTitle}>聯絡資料</h2>
            <p className={styles.sectionSubtitle}>如訂單有變動，我們將通知您</p>
            <button className={styles.addButton}>+ 新增</button>
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

          {/* Confirmation and Submit */}
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
            <button className={styles.submitButton}>前往付款</button>
          </div>
        </div>

        {/* Right Side: Summary and Pricing */}
        <div className={styles.rightContainer}>
          {/* Summary Block */}
          <div className={styles.summaryBlock}>
            <h3 className={styles.summaryTitle}>
              野柳&九份&十分&十分瀑布&黃金瀑布一日遊
            </h3>
            <p>野柳&九份&十分&十分瀑布&黃金瀑布一日遊（西門町出發）</p>
            <p>24小時前可免費取消</p>
            <p>日期：2024年6月21日</p>
            <p>數量：成人 x 1</p>
            <p>總價：NT$ 694</p>
          </div>

          {/* Pricing Block */}
          <div className={styles.pricingBlock}>
            <p>原價：NT$ 991</p>
            <p>優惠活動折扣：-NT$ 297</p>
            <p className={styles.finalPrice}>付款金額：NT$ 694</p>
            <p className={styles.totalSavings}>共省下：NT$ 297</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
