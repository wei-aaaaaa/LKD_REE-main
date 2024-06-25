import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    useEffect(() => {
        if (userId) {
            fetchCartItems();
        }
    }, [userId]);

    useEffect(() => {
        calculateTotalPrice();
    }, [cartItems, selectedItems]);

    const fetchCurrentUser = async () => {
        try {
            const response = await fetch(
                "https://localhost:7148/api/LoginJWT/get-current-user",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );
            if (!response.ok) {
                throw new Error(
                    `Network response was not ok: ${response.statusText}`
                );
            }
            const data = await response.json();
            setUserId(data.id);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const fetchCartItems = async () => {
        try {
            const response = await fetch(
                `https://localhost:7148/api/ShoppingCartApi/get`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userId),
                }
            );
            const data = await response.json();
            console.log("Fetched cart items: ", data); // 確認收到的數據
            setCartItems(data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // const calculateTotalPrice = () => {
    //     console.log("Calculating total price with cart items: ", cartItems);
    //     const total = selectedItems.reduce((sum, itemId) => {
    //         const item = cartItems.find(
    //             (cartItem) => cartItem.bookingId === itemId
    //         );
    //         console.log("Calculating item: ", item);
    //         return item ? sum + item.price * item.member : sum;
    //     }, 0);
    //     console.log("Total price calculated: ", total);
    //     setTotalPrice(total);
    // };

    const calculateTotalPrice = () => {
        const total = selectedItems.reduce((sum, itemId) => {
            const item = cartItems.find(
                (cartItem) => cartItem.bookingId === itemId
            );
            return item ? sum + item.price : sum;
        }, 0);
        setTotalPrice(total);
    };

    const handleRemoveFromCart = async (bookingId) => {
        try {
            const response = await fetch(
                "https://localhost:7148/api/ShoppingCartApi/delete",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(bookingId),
                }
            );
            if (response.ok) {
                setCartItems((prevItems) =>
                    prevItems.filter((item) => item.bookingId !== bookingId)
                );
                setSelectedItems((prevSelected) =>
                    prevSelected.filter((id) => id !== bookingId)
                );
            } else {
                console.error("Failed to remove item", response.statusText);
            }
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    const handleCheckout = () => {
        if (selectedItems.length === 0) {
            window.alert("請選擇行程");
            return;
        }

        const selectedCartItems = cartItems.filter((item) =>
            selectedItems.includes(item.bookingId)
        );

        navigate("/checkout", { state: { selectedCartItems } });
    };

    const handleSelectItem = (bookingId) => {
        setSelectedItems((prevSelected) =>
            prevSelected.includes(bookingId)
                ? prevSelected.filter((id) => id !== bookingId)
                : [...prevSelected, bookingId]
        );
    };

    const handleSelectAll = () => {
        setSelectedItems(
            selectedItems.length === cartItems.length
                ? []
                : cartItems.map((item) => item.bookingId)
        );
    };

    const handleClearCart = async () => {
        try {
            await Promise.all(
                cartItems.map((item) =>
                    fetch("https://localhost:7148/api/ShoppingCartApi/delete", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(item.bookingId),
                    })
                )
            );
            setCartItems([]);
            setSelectedItems([]);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleUpdateQuantity = (bookingId, newQuantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.bookingId === bookingId
                    ? {
                          ...item,
                          member: newQuantity,
                          price: item.modelId
                              ? item.model.modelPrice * newQuantity
                              : item.activity.price * newQuantity,
                      }
                    : item
            )
        );
    };

    return (
        <div className="cart">
            <h1>購物車頁面</h1>
            {cartItems.length > 0 && (
                <div className="cart-actions">
                    <button className="btn" onClick={handleSelectAll}>
                        {selectedItems.length === cartItems.length
                            ? "取消全選"
                            : "全選"}
                    </button>
                    <button className="btn" onClick={handleClearCart}>
                        清空購物車
                    </button>
                </div>
            )}
            {cartItems.length === 0 ? (
                <p>目前購物車暫無商品</p>
            ) : (
                <div>
                    {cartItems.map((item) => (
                        <div key={item.bookingId} className="cart-item">
                            <input
                                type="checkbox"
                                checked={selectedItems.includes(item.bookingId)}
                                onChange={() =>
                                    handleSelectItem(item.bookingId)
                                }
                            />
                            <img
                                src={`data:image/jpeg;base64,${item.activity.photo}`}
                                alt={item.activity.name}
                                className="cart-item-photo"
                            />
                            <div className="cart-item-details">
                                <div>
                                    {item.model
                                        ? `${item.activity.name} - 【${item.model.modelName}】`
                                        : item.activity.name}
                                </div>
                                <div>
                                    {new Date(
                                        item.activity.date
                                    ).toLocaleDateString()}
                                </div>
                            </div>
                            <div className="cart-item-quantity">
                                <button
                                    onClick={() =>
                                        handleUpdateQuantity(
                                            item.bookingId,
                                            item.member - 1
                                        )
                                    }
                                    disabled={item.member <= 1}
                                >
                                    -
                                </button>
                                <span>人數 {item.member}</span>
                                <button
                                    onClick={() =>
                                        handleUpdateQuantity(
                                            item.bookingId,
                                            item.member + 1
                                        )
                                    }
                                >
                                    +
                                </button>
                            </div>
                            <div className="cart-item-price">
                                NTD {item.price.toLocaleString()}
                            </div>
                            <div className="cart-item-remove">
                                <button
                                    onClick={() =>
                                        handleRemoveFromCart(item.bookingId)
                                    }
                                >
                                    移除
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {cartItems.length > 0 && (
                <div className="cart-summary">
                    <p>
                        Total:{" "}
                        <span id="total-price">
                            NTD {totalPrice.toLocaleString()}
                        </span>
                    </p>
                    <button onClick={handleCheckout}>去結帳</button>
                </div>
            )}
        </div>
    );
};

export default Cart;
