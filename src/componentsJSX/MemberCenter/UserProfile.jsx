import React, { useState, useEffect } from 'react';
import './UserProfile.css';

const UserProfile = () => {
    const [user, setUser] = useState({
        userId: 17, // 假設你已經知道使用者的ID為1
        username: '',
        fPhone: '',
    });
    const [isEditing, setIsEditing] = useState({
        username: false,
        fPhone: false,
    });
    const [editValues, setEditValues] = useState({});

    useEffect(() => {
        // 模擬從API獲取資料
        fetch('https://localhost:7148/api/Member/17') // 這裡的1應該替換為實際的使用者ID
            .then(response => response.json())
            .then(data => {
                setUser(data);
            });
    }, []);

    const handleEditClick = (field) => {
        setIsEditing((prev) => ({ ...prev, [field]: true }));
        setEditValues((prev) => ({ ...prev, [field]: user[field] }));
    };

    const handleInputChange = (field, value) => {
        setEditValues((prev) => ({ ...prev, [field]: value }));
    };

    const handleSaveClick = async (field) => {
        const updatedUser = { ...user, [field]: editValues[field] };

        const response = await fetch(`https://localhost:7090/api/Member/17`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        });

        if (response.ok) {
            setUser(updatedUser);
            setIsEditing((prev) => ({ ...prev, [field]: false }));
        } else {
            console.error('Failed to update user');
        }
    };

    const handleCancelClick = (field) => {
        setIsEditing((prev) => ({ ...prev, [field]: false }));
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
