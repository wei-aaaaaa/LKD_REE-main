import React, { useState, useEffect } from 'react';
import './UserProfile.css';

const UserProfile = ({ userId }) => {
    const [user, setUser] = useState({
        userId: userId,
        username: '',
        fPhone: '',
    });
    const [isEditing, setIsEditing] = useState({
        username: false,
        fPhone: false,
    });
    const [editValues, setEditValues] = useState({});

    useEffect(() => {
        // 使用從 props 傳遞進來的 userId 進行 API 請求
        fetch(`https://localhost:7148/api/Member/${userId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setUser(data))
            .catch(error => console.error('Error fetching user data:', error));
    }, [userId]);

    const handleEditClick = (field) => {
        setIsEditing(prev => ({ ...prev, [field]: true }));
        setEditValues(prev => ({ ...prev, [field]: user[field] }));
    };

    const handleInputChange = (field, value) => {
        setEditValues(prev => ({ ...prev, [field]: value }));
    };

    const handleSaveClick = async (field) => {
        const updatedUser = { ...user, [field]: editValues[field] };

        try {
            const response = await fetch(`https://localhost:7148/api/Member/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(updatedUser),
            });

            if (response.ok) {
                setUser(updatedUser);
                setIsEditing(prev => ({ ...prev, [field]: false }));

                if (field === 'username') {
                    // 刷新 token
                    const tokenResponse = await fetch(`https://localhost:7148/api/LoginJWT/refresh-token`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify({ token: localStorage.getItem('token') })
                    });

                    if (tokenResponse.ok) {
                        const tokenData = await tokenResponse.json();
                        localStorage.setItem('token', tokenData.token);
                    } else {
                        console.error('Failed to refresh token');
                    }
                }
            } else {
                console.error('Failed to update user');
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleCancelClick = (field) => {
        setIsEditing(prev => ({ ...prev, [field]: false }));
    };

    return (
        <div className="user-profile">
            <h2>個人資料</h2>

            <div className="profile-item">
                <span>姓名:</span>
                {isEditing.username ? (
                    <div>
                        <input
                            type="text"
                            value={editValues.username}
                            onChange={(e) => handleInputChange('username', e.target.value)}
                        />
                        <button onClick={() => handleSaveClick('username')}>保存</button>
                        <button onClick={() => handleCancelClick('username')}>取消</button>
                    </div>
                ) : (
                    <div>
                        {user.username}
                        <a href="#" onClick={() => handleEditClick('username')}>編輯</a>
                    </div>
                )}
            </div>
            <div className="profile-item">
                <span>手機號碼:</span>
                {isEditing.fPhone ? (
                    <div>
                        <input
                            type="text"
                            value={editValues.fPhone}
                            onChange={(e) => handleInputChange('fPhone', e.target.value)}
                        />
                        <button onClick={() => handleSaveClick('fPhone')}>保存</button>
                        <button onClick={() => handleCancelClick('fPhone')}>取消</button>
                    </div>
                ) : (
                    <div>
                        {user.fPhone}
                        <a href="#" onClick={() => handleEditClick('fPhone')}>編輯</a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
