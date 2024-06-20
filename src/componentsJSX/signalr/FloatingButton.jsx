import React, { useState, useEffect } from 'react';
import './FloatingButton.scss';
import App from '../signalr/Signalr';

const FloatingButton = () => {
    // 初始位置從localStorage中獲取，默認為{x: 100, y: 100}
    const initialPosition = JSON.parse(localStorage.getItem('buttonPosition')) || { x: 100, y: 100 };

    // 設置初始狀態
    const [position, setPosition] = useState(initialPosition);
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isChatVisible, setIsChatVisible] = useState(false);

    // 每次位置更新時將位置存儲到localStorage中
    useEffect(() => {
        localStorage.setItem('buttonPosition', JSON.stringify(position));
    }, [position]);

    // 當按下鼠標按鈕時，設置拖動狀態和偏移量
    const handleMouseDown = (e) => {
        const rect = e.target.getBoundingClientRect();
        setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setIsDragging(true);
    };

    // 當釋放鼠標按鈕時，取消拖動狀態
    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // 當鼠標移動時，若處於拖動狀態則更新位置
    const handleMouseMove = (e) => {
        if (isDragging) {
            let newX = e.clientX - offset.x;
            let newY = e.clientY - offset.y;

            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            // 防止按鈕超出窗口邊界
            if (newX < 0) newX = 0;
            if (newY < 0) newY = 0;
            if (newX > windowWidth - 50) newX = windowWidth - 50;
            if (newY > windowHeight - 50) newY = windowHeight - 50;

            setPosition({ x: newX, y: newY });
        }
    };

    // 添加和移除全局鼠標事件監聽器
    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, offset]);

    // 切換聊天窗口的可見性
    const handleButtonClick = () => {
        setIsChatVisible(!isChatVisible);
    };

    return (
        <>
            <img
                src="..\src\assets\images\icons\message.png"
                alt="客服按鈕"
                className="floating-button"
                onMouseDown={handleMouseDown}
                onClick={handleButtonClick}
                style={{ left: `${position.x}px`, top: `${position.y}px` }}
            />
            {isChatVisible && (
                <div className="chat-window">
                    <div className="chat-header">
                        真人客服
                        <button className="close-button" onClick={handleButtonClick}>X</button>
                    </div>
                    <div className="chat-messages">
                        <App />
                    </div>
                </div>
            )}
        </>
    );
};

export default FloatingButton;
