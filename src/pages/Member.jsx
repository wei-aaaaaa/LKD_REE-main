import React, { useState, useEffect } from 'react';
import './Member.css';
import Sidebar from '../componentsJSX/MemberCenter/Sidebar';
import OrderList from '../componentsJSX/MemberCenter/OrderList';
import UserProfile from '../componentsJSX/MemberCenter/UserProfile';
import Myreviews from '../componentsJSX/MemberCenter/Myreviews';
import Payment from '../componentsJSX/MemberCenter/Payment';

const MemberCenter = () => {
    const [activeComponent, setActiveComponent] = useState('profile');
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            setError('No token found');
            setLoading(false);
            return;
        }

        fetch('https://localhost:7148/api/LoginJWT/get-current-user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            setUserData(data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            setError(error.message);
            setLoading(false);
        });
    }, []);

    const handleMenuItemClick = (menuItem) => {
        setActiveComponent(menuItem);
    };

    if (error) {
        return <div>Error loading user data: {error}</div>;
    }

    return (
        <div className="member-center">
            <Sidebar userId={userData ? userData.id : ''} onMenuItemClick={handleMenuItemClick} />
            <div className="content">
                {activeComponent === 'orders' && userData && <OrderList userId={userData.id} />}
                {activeComponent === 'profile' && userData && <UserProfile userId={userData.id} />}
                {activeComponent === 'reviews' && userData && <Myreviews userId={userData.id} />}
                {activeComponent === 'payment' && userData && <Payment userId={userData.id} />}
            </div>
        </div>
    );
}

export default MemberCenter;
