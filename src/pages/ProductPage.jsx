import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import GridPic from "../componentsJSX/GridPic";
import Reviews from "../componentsJSX/Reviews";
import ProductDesc from "../componentsJSX/ProductDesc";
import ProductHeader from "../componentsJSX/ProductHeader";
import PhotoDesc from "../componentsJSX/PhotoDesc";
import ProductBundle from "../componentsJSX/ProductBundleBlock";
import { ToastContainer, toast, Flip, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProductPage.css";
import Loader from "../componentsJSX/Loader";
import { useUser } from "../componentsJSX/UserDataContext";

const ProductPage = () => {
    const { id } = useParams();
    const user = useUser(); // 獲取用戶信息
    const userId = user?.id; // 獲取用戶 ID
    const [product, setProduct] = useState(null);
    const [averageRating, setAverageRating] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    const fetchhistory = async () => {
        try {
            await fetch(
                "https://localhost:7148/api/BrowsingHistoryAPI/UserBrowse",
                {
                    method: "post",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                    body: JSON.stringify({
                        activityId: `${id}`,
                    }),
                }
            )
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                });
        } catch (error) {
            console.error("fail to fetch history", error);
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(
                    `https://localhost:7148/api/ActivitiesAPI/${id}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch product details");
                }
                const productData = await response.json();
                setProduct(productData);

                if (productData.reviews && productData.reviews.length > 0) {
                    const totalRating = productData.reviews.reduce(
                        (acc, review) => acc + review.rating,
                        0
                    );
                    setAverageRating(
                        (totalRating / productData.reviews.length).toFixed(2)
                    );
                }

                if (userId) {
                    const favoriteResponse = await fetch(
                        `https://localhost:7148/api/Favorites/${userId}/${id}`
                    );
                    if (favoriteResponse.ok) {
                        setIsFavorite(true);
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        if (userId) {
            fetchhistory();
        }
        fetchProduct();
    }, [id, userId]);

    const toggleFavorite = async () => {
        if (!userId) {
            toast.error("請先登入", {
                autoClose: 1000,
                transition: Zoom,
                position: "top-center",
            });
            return;
        }

        const method = isFavorite ? "DELETE" : "POST";
        const url = `https://localhost:7148/api/Favorites/${
            isFavorite ? `removeFavorite/${userId}/${id}` : "addFavorite"
        }`;

        try {
            const options = {
                method: method,
                headers: { "Content-Type": "application/json" },
            };

            if (!isFavorite) {
                options.body = JSON.stringify({
                    UserID: userId,
                    ActivityID: id,
                });
            }

            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error("Failed to update favorite status");
            }

            setIsFavorite(!isFavorite);
            toast(isFavorite ? "取消收藏💔" : "已加入收藏！❤️", {
                autoClose: 1000,
                transition: Flip,
                position: "top-center",
            });
        } catch (error) {
            console.error("Error updating favorite status:", error);
            toast.error(`Error updating favorite status: ${error.message}`, {
                autoClose: 1000,
                transition: Zoom,
                position: "top-center",
            });
        }
    };

    if (!product) {
        return (
            <div>
                <Loader />
            </div>
        );
    }

    const formattedDate = format(new Date(product.date), "yyyy年MM月dd日");
    const productImages = product.photo.map((src, index) => ({
        src: `data:image/png;base64,${src}`,
        description: product.photoDesc[index],
    }));

    return (
        <div className="product-page">
            <ToastContainer />
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
                description={product.description} // 原始描述
                descriptionJson={product.descriptionJson || null} // 传递结构化描述或 null
            />
            <ProductBundle productId={id} />
            <PhotoDesc images={productImages} />
            <Reviews reviews={product.reviews} />
        </div>
    );
};

export default ProductPage;
