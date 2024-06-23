import React, { useState, useEffect } from "react";
import styles from "./Favorite99.module.css";

const FavoriteProducts = () => {
  const [products, setProducts] = useState([]);
  const userId = 2; // 替換為實際的用戶ID

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      try {
        const response = await fetch(
          `https://localhost:7148/api/Favorites/${userId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched data:", data); // 輸出查看數據
        setProducts(data);
      } catch (error) {
        console.error("Error fetching favorite products:", error);
      }
    };
    fetchFavoriteProducts();
  }, [userId]);

  const handleDelete = async (activityId) => {
    if (window.confirm("確定要刪除此收藏嗎？")) {
      try {
        console.log("Sending DELETE request...");
        console.log(
          `Deleting favorite with userId: ${userId}, activityId: ${activityId}`
        );
        const response = await fetch(
          `https://localhost:7148/api/Favorites/removeFavorite/${userId}/${activityId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("DELETE request successful");
        // 刪除成功後更新本地狀態
        setProducts(
          products.filter((product) => product.activityId !== activityId)
        );
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div className={styles.favoritePageWrapper}>
      <div className={styles.favoritePage}>
        <h1>我的收藏</h1>
        <div className={styles.favoriteGrid}>
          {products.map((product) => (
            <div key={product.activityId} className={styles.favoriteItem}>
              <img
                src={`data:image/png;base64,${product.photo[0]}`}
                alt={product.activityName}
                className={styles.favoriteImage}
              />
              <h2>{product.activityName}</h2>
              <p>{product.activityDescription}</p>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(product.activityId)}
              >
                刪除
              </button>
            </div>
          ))}
          {products.length === 0 && (
            <p className={styles.noFavorites}>目前沒有收藏的商品</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoriteProducts;
