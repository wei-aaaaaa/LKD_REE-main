import React, { useState, useEffect } from "react";
import "./ProductBundleBlock.css";
import { id } from "date-fns/locale";
import { useUser } from "./UserDataContext";

const ProductBundleBlock = ({ productId }) => {
  const user = useUser(); // 獲取用戶信息
  const userId = user?.id; // 獲取用戶 ID
  const [bundles, setBundles] = useState([]);
  const [selectedBundleId, setSelectedBundleId] = useState(null);
  const [quantities, setQuantities] = useState({});
  console.log("user:", userId, productId);
  const addToCart = async () => {
    if (!userId) {
      alert("請先登入會員");
      return;
    }

    const quantity = quantities[selectedBundleId] || 1; // 確保 quantity 有值

    try {
      const url = `https://localhost:7148/api/ShoppingCartApi?UserId=${userId}&ActivityId=${productId}&ModelId=${selectedBundleId}&Quantity=${quantity}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("已成功加入購物車");
      } else {
        const errorMessage = await response.text();
        alert(`添加購物車失敗: ${errorMessage}`);
      }
    } catch (error) {
      alert(`添加購物車時出錯: ${error.message}`);
    }
  };

  useEffect(() => {
    const fetchBundles = async () => {
      try {
        const response = await fetch(
          `https://localhost:7148/api/ActivitiesAPI/${productId}/ActivitiesModels`
        );
        console.log("productId:", productId);
        if (!response.ok) {
          throw new Error("Failed to fetch bundles");
        }
        const data = await response.json();
        setBundles(data);
        const initialQuantities = {};
        data.forEach((bundle) => {
          initialQuantities[bundle.modelId] = 1; // 初始化每個方案的數量為1
        });
        setQuantities(initialQuantities);
      } catch (error) {
        console.error("Error fetching bundles:", error);
      }
    };

    fetchBundles();
  }, [productId]);

  const handleSelectBundle = (modelId) => {
    setSelectedBundleId((prevId) => (prevId === modelId ? null : modelId));
  };

  const handleQuantityChange = (modelId, change) => {
    setQuantities((prev) => ({
      ...prev,
      [modelId]: Math.max(1, prev[modelId] + change),
    }));
  };

  const handleClickOutside = (e) => {
    e.stopPropagation(); // 阻止事件繼續傳播
    setSelectedBundleId(null); // 點擊外部時收回方案敘述
  };

  return (
    <div className="product-bundle-block" onClick={handleClickOutside}>
      <div
        className="product-bundle-container"
        onClick={(e) => e.stopPropagation()}
      >
        {bundles.map((bundle) => (
          <div
            key={bundle.modelId}
            className={`product-bundle ${
              selectedBundleId === bundle.modelId ? "selected" : ""
            }`}
            onClick={() => handleSelectBundle(bundle.modelId)}
          >
            <div className="bundle-header">
              <div>
                <h4 className="bundle-title">{bundle.modelName}</h4>
                <p className="bundle-price">${bundle.modelPrice}</p>
              </div>
              {/* <button className="choose-button">選擇</button> */}
            </div>
            <p className="bundle-description">{bundle.modelContent}</p>
          </div>
        ))}
      </div>
      {selectedBundleId && (
        <div className="bundle-details" onClick={(e) => e.stopPropagation()}>
          <h4>
            {bundles.find((b) => b.modelId === selectedBundleId).modelName}
          </h4>
          <p>
            {bundles.find((b) => b.modelId === selectedBundleId).modelContent}
          </p>
          <p>
            價格: $
            {bundles.find((b) => b.modelId === selectedBundleId).modelPrice}
          </p>
          <div className="quantity-selector">
            <p>選擇人數:</p>
            <button
              className="quantity-button"
              onClick={(e) => {
                e.stopPropagation();
                handleQuantityChange(selectedBundleId, -1);
              }}
            >
              -
            </button>
            <span className="quantity">{quantities[selectedBundleId]}</span>
            <button
              className="quantity-button"
              onClick={(e) => {
                e.stopPropagation();
                handleQuantityChange(selectedBundleId, 1);
              }}
            >
              +
            </button>
          </div>
          <div className="bundle-actions">
            <button className="small-book-now-button">立即預訂</button>
            <button className="small-add-to-cart-button" onClick={addToCart}>
              加入購物車
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductBundleBlock;
