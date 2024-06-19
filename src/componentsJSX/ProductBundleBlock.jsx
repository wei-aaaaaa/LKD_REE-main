import React, { useState, useEffect } from 'react';
import './ProductBundleBlock.css';

const ProductBundleBlock = ({ productId }) => {
  const [bundles, setBundles] = useState([]);
  const [selectedBundle, setSelectedBundle] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchBundles = async () => {
      try {
        const response = await fetch(`https://localhost:7148/api/ActivitiesAPI/13/ActivitiesModels`);
        if (!response.ok) {
          throw new Error('Failed to fetch bundles');
        }
        const data = await response.json();
        setBundles(data);
      } catch (error) {
        console.error('Error fetching bundles:', error);
      }
    };

    fetchBundles();
  }, [productId]);

  const handleSelectBundle = (bundle) => {
    setSelectedBundle(bundle);
    setQuantity(1); // 當選擇不同方案時，數量重置為1
  };

  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change)); // 確保數量不小於1
  };

  return (
    <div className="product-bundle-block">
      <div className="product-bundle-container">
        {bundles.map((bundle) => (
          <div 
            key={bundle.id} 
            className={`product-bundle ${selectedBundle?.id === bundle.id ? 'selected' : ''}`}
            onClick={() => handleSelectBundle(bundle)}
          >
            <div className="bundle-header">
              <div>
                <h4 className="bundle-title">{bundle.modelName}</h4>
                <p className="bundle-price">${bundle.modelPrice}</p>
              </div>
              <button className="choose-button">選擇</button>
            </div>
            <p className="bundle-description">{bundle.modelContent}</p>
            {selectedBundle?.id === bundle.id && (
              <>
                <div className="quantity-selector">
                  <p>選擇人數:</p>
                  <div className="quantity-controls">
                    <button className="quantity-button" onClick={() => handleQuantityChange(-1)}>-</button>
                    <span className="quantity">{quantity}</span>
                    <button className="quantity-button" onClick={() => handleQuantityChange(+1)}>+</button>
                  </div>
                </div>
                <div className="bundle-actions">
                  <button className="small-book-now-button">立即預定</button>
                  <button className="small-add-to-cart-button">加入購物車</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {selectedBundle && (
        <div className="bundle-details">
          <h4>{selectedBundle.modelName}</h4>
          <p>{selectedBundle.modelContent}</p>
          <p>價格: ${selectedBundle.modelPrice}</p>
        </div>
      )}
    </div>
  );
};

export default ProductBundleBlock;
