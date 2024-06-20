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
        const userId = 2; // Replace with actual user ID from session or context
        const fetchProduct = async () => {
        try {
            const response = await fetch(`https://localhost:7148/api/ActivitiesAPI/${id}`);
            if (!response.ok) {
            throw new Error('Failed to fetch product details');
            }
            const productData = await response.json();
            setProduct(productData);

            if (productData.reviews && productData.reviews.length > 0) {
            const totalRating = productData.reviews.reduce((acc, review) => acc + review.rating, 0);
            setAverageRating((totalRating / productData.reviews.length).toFixed(2));
            }

            const favoriteResponse = await fetch(`https://localhost:7148/api/Favorites/favoriteStatus?userId=${userId}&activityId=${id}`);
            if (favoriteResponse.ok) {
            const favoriteData = await favoriteResponse.json();
            setIsFavorite(favoriteData.isFavorite);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        fetchProduct();
    }, [id]);

    const toggleFavorite = async () => {
        const userId = 2; // 使用實際的用戶 ID
        const method = isFavorite ? 'DELETE' : 'POST';
        // 根据是否已经是收藏来调整URL路径
        const url = `https://localhost:7148/api/Favorites/${isFavorite ? `removeFavorite/${userId}/${id}` : 'addFavorite'}`;
    
        try {
            const options = {
                method: method,
                headers: { 'Content-Type': 'application/json' },
            };
    
            // 当添加收藏时发送请求体
            if (!isFavorite) {
                options.body = JSON.stringify({
                    UserID: userId,
                    ActivityID: id
                });
            }
    
            const response = await fetch(url, options);
            console.log(response);
    
            if (!response.ok) {
                throw new Error(`Failed to ${isFavorite ? 'remove from' : 'add to'} favorites: ${response.statusText}`);
            }
    
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error('Error updating favorite status:', error);
            alert(`Error updating favorite status: ${error.message}`);
        }
    };
    
    if (!product) {
        return <div>Loading...</div>;
    }

    const formattedDate = format(new Date(product.date), 'yyyy年MM月dd日');
    const productImages = product.photo.map((src, index) => ({
        src: `data:image/png;base64,${src}`,
        description: product.photoDesc[index],
    }));

    return (
        <div className="product-page">
        <ProductHeader
            title={product.name}
            averageRating={averageRating}
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
            address={product.address}
        />
        <GridPic images={productImages} />
        <ProductDesc
            price={product.price}
            date={formattedDate}
            remaining={product.remaining}
            description={product.description}
        />
        <ProductBundle />
        <PhotoDesc images={productImages} />
        <Reviews reviews={product.reviews} />
        </div>
    );
    };

    export default ProductPage;
