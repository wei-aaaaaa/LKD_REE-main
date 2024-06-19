import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import GridPic from '../componentsJSX/GridPic';
import Reviews from '../componentsJSX/Reviews';
import ProductDesc from '../componentsJSX/ProductDesc';
import ProductHeader from '../componentsJSX/ProductHeader';
import PhotoDesc from '../componentsJSX/PhotoDesc'; // 引入 PhotoDesc 组件
import ProductBundle from '../componentsJSX/ProductBundleBlock';
import './ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [averageRating, setAverageRating] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://localhost:7148/api/ActivitiesAPI/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProduct(data);

        // Calculate average rating
        if (data.reviews && data.reviews.length > 0) {
          const totalRating = data.reviews.reduce((acc, review) => acc + review.rating, 0);
          const avgRating = totalRating / data.reviews.length;
          setAverageRating(avgRating.toFixed(2)); // 保留兩位小數
        }

        // Fetch favorite status
        const userId = 2; // 替換為實際用戶ID
        const favoriteResponse = await fetch(`https://localhost:7148/api/Bookings/favoriteStatus`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            UserID: userId,
            ActivityID: id,
          }),
        });

        if (favoriteResponse.ok) {
          const favoriteData = await favoriteResponse.json();
          setIsFavorite(favoriteData.isFavorite);
        }

      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  // 格式化日期為西元年、月、日
  const formattedDate = format(new Date(product.date), 'yyyy年MM月dd日');

  // 將 photo 和 photoDesc 結合
  const productImages = product.photo.map((src, index) => ({
    src: `data:image/png;base64,${src}`,
    description: product.photoDesc[index] // 取對應的描述
  }));

 const toggleFavorite = async () => {
  try {
    const userId = 2; // 替換為實際用戶ID
    if (isFavorite) {
      // 刪除收藏
      const response = await fetch(`https://localhost:7148/api/Bookings?userId=${userId}&activityId=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete favorite');
      }

      setIsFavorite(false); // 更新為未收藏状态
    } else {
      // 添加收藏
      const response = await fetch(`https://localhost:7148/api/Bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UserID: userId,
          ActivityID: id,
          BookingDate: new Date().toISOString(),
          Price: product.price,
          BookingStatesID: 2, // 2: 收藏
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add favorite');
      }

      setIsFavorite(true); // 更新為已收藏状态
    }
  } catch (error) {
    console.error('Error updating favorite status:', error);
  }
};

  return (
    <div className="product-page">
      <ProductHeader 
        title={product.name}
        averageRating={averageRating}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
      />

      {/* 在商品标题下方添加 Hashtag 区块 */}
      <div className="hashtags">
        {product.tags && product.tags.map((tag, index) => (
          <span key={index} className="hashtag">
            #{tag}
          </span>
        ))}
      </div>

      <GridPic images={productImages} />

      <ProductDesc
        price={product.price}
        date={formattedDate}
        remaining={product.remaining}
        description={product.description}
      />

      <ProductBundle/>

      <PhotoDesc images={productImages} />  {/* 新增 PhotoDesc 组件 */}

      <Reviews reviews={product.reviews} />

      {/* <div className="product-footer">
        <button className="book-now-button">立即預訂</button>
        <button className="add-to-cart-button">加入購物車</button>
        <div className="share-buttons">
        </div>
      </div> */}
    </div>
  );
};

export default ProductPage;
