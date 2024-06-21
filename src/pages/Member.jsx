import React, { useState } from 'react';
import './Member.css';
import Sidebar from '../componentsJSX/MemberCenter/Sidebar';
import OrderList from '../componentsJSX/MemberCenter/OrderList';
import UserProfile from '../componentsJSX/MemberCenter/UserProfile';
import Myreviews from '../componentsJSX/MemberCenter/Myreviews';
import Payment from '../componentsJSX/MemberCenter/Payment';

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
                <div style={{ display: activeComponent === 'orders' ? 'block' : 'none' }}>
                    <OrderList userId={userId} />
                </div>
                <div style={{ display: activeComponent === 'profile' ? 'block' : 'none' }}>
                    <UserProfile />
                </div>
                <div style={{ display: activeComponent === 'reviews' ? 'block' : 'none' }}>
                    <Myreviews />
                </div>

                <div style={{ display: activeComponent === 'payment' ? 'block' : 'none' }}>
                    <Payment />
                </div>
                
            </div>
        </div>
    );
}

export default MemberCenter;
