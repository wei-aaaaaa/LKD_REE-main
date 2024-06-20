// ProductPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import GridPic from '../componentsJSX/GridPic';
import Reviews from '../componentsJSX/Reviews';
import ProductDesc from '../componentsJSX/ProductDesc';
import ProductHeader from '../componentsJSX/ProductHeader';
import PhotoDesc from '../componentsJSX/PhotoDesc';
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
          setAverageRating(avgRating.toFixed(2));
        }

        // Fetch favorite status
        const userId = 2;
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

  const formattedDate = format(new Date(product.date), 'yyyy年MM月dd日');
  const productImages = product.photo.map((src, index) => ({
    src: `data:image/png;base64,${src}`,
    description: product.photoDesc[index],
  }));

  const toggleFavorite = async () => {
    try {
      const userId = 2;
      if (isFavorite) {
        const response = await fetch(`https://localhost:7148/api/Bookings?userId=${userId}&activityId=${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete favorite');
        }
        setIsFavorite(false);
      } else {
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
            BookingStatesID: 2,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to add favorite');
        }
        setIsFavorite(true);
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
      address={product.address}  // 傳遞地址到 ProductHeader
    />

      <GridPic images={productImages} />

      <div className="product-info">
        <ProductDesc
          price={product.price}
          date={formattedDate}
          remaining={product.remaining}
          description={product.description}
        />
      </div>

      <ProductBundle />

      <PhotoDesc images={productImages} />

      <Reviews reviews={product.reviews} />
    </div>
  );
};

export default ProductPage;
