import React, { useRef, useState, useEffect } from 'react';
import './Sidebar.css';

const Sidebar = ({ onMenuItemClick }) => {
    const fileInputRef = useRef(null);
    const [avatarUrl, setAvatarUrl] = useState('https://via.placeholder.com/150');
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('https://localhost:7148/api/Member/17');
                if (response.ok) {
                    const data = await response.json();
                    setUsername(data.username);
                    if (data.userPic) {
                        setAvatarUrl(`data:image/jpeg;base64,${data.userPic}`);
                    }
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();

        // 設置一個間隔來定期獲取用戶資料
        const intervalId = setInterval(fetchUserData, 2000); // 每5分鐘獲取一次

        // 清除 interval 以防止記憶體洩漏
        return () => clearInterval(intervalId);
    }, []);

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch('https://localhost:7148/api/Member/UploadUserPic/17', {
                    method: 'PUT',
                    body: formData,
                });

                if (response.ok) {
                    alert('圖片上傳成功');

                    // 讀取上傳的圖片並更新圖片 URL
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setAvatarUrl(reader.result);
                    };
                    reader.readAsDataURL(file);
                } else {
                    const errorData = await response.json();
                    console.error('圖片上傳失敗:', errorData);
                    alert(`圖片上傳失敗: ${errorData.message}`);
                }
            } catch (error) {
                console.error('圖片上傳錯誤:', error);
                alert('圖片上傳發生錯誤');
            }
        }
    };

    return (
        <div className="sidebar">
            <div className="profile">
                <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="avatar"
                    onClick={handleImageClick}
                    style={{ cursor: 'pointer' }}
                />
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <h2>用戶名稱: {username}</h2>
                <button onClick={() => onMenuItemClick('profile')}>管理個人資料</button>
            </div>
            <div className="menu">
                <ul>
                    <li onClick={() => onMenuItemClick('orders')}>我的訂單</li>
                    <li onClick={() => onMenuItemClick('reviews')}>我的評價</li>
                    <li onClick={() => onMenuItemClick('payment')}>管理付款方式</li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
