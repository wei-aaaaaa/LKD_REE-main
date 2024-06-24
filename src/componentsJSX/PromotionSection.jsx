import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PromotionSection.css";

const PromotionSection = () => {
  const [promotions, setPromotions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPromotions = async () => {
      const url = "https://localhost:7148/api/HotActivities"; // API 端點

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json(); // 解析 JSON 數據
          console.log("Fetched data:", data); // 日誌：檢查 API 返回的數據
          const formattedData = data.map((activity) => ({
            id: activity.activityId, // 添加活動 ID
            image: activity.albums[0]
              ? `data:image/jpeg;base64,${activity.albums[0]}`
              : "", // 假設活動有相冊圖片
            title: activity.name,
            description: activity.description,
          }));
          console.log("Formatted data:", formattedData); // 日誌：檢查格式化後的數據
          setPromotions(formattedData);
        } else {
          console.error("Failed to fetch promotions:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching promotions:", error);
      }
    };

    loadPromotions();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/productpage/${id}`);
  };

  return (
    <section className="promotion-section">
      <h2 className="title">強檔活動</h2>
      <p className="subtitle">
        不要錯過我們最新的促銷活動，享受驚人的折扣和優惠！
      </p>

      <div className="cards-container">
        {promotions.slice(0, 4).map(
          (
            promo,
            index // 只顯示前四個活動
          ) => (
            <div
              key={index}
              className="card"
              onClick={() => handleCardClick(promo.id)} // 添加點擊事件處理程序
            >
              <img
                src={promo.image || "/path/to/placeholder-image.jpg"}
                alt={promo.title}
                className="image"
              />
              <h3 className="card-title">{promo.title}</h3>
              <p className="card-description">{promo.description}</p>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default PromotionSection;
