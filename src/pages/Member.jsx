import React, { useState } from 'react';
import './Member.css';
import Sidebar from '../componentsJSX/MemberCenter/Sidebar';
import OrderList from '../componentsJSX/MemberCenter/OrderList';
import UserProfile from '../componentsJSX/MemberCenter/UserProfile';
import Myreviews from '../componentsJSX/MemberCenter/Myreviews';

const MemberCenter = () => {
    const userId = 17; // 假設你有一個用戶 ID
    const [activeComponent, setActiveComponent] = useState('profile');

    const handleMenuItemClick = (menuItem) => {
        setActiveComponent(menuItem);
    };

    return (
        <div className="member-center">
            <Sidebar onMenuItemClick={handleMenuItemClick} />
            <div className="content">
                {activeComponent === 'orders' && <OrderList userId={userId} />}
                {activeComponent === 'profile' && <UserProfile />}
                {activeComponent === 'reviews' && <Myreviews />}
                {/* 其他組件根據需要添加 */}
            </div>
        </div>
    );
}

export default MemberCenter;
