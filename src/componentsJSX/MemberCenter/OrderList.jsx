import React, { useEffect, useState } from 'react';
import './OrderList.css';
import AddReview from './AddReview';

const OrderList = ({ userId }) => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://localhost:7148/api/BookingHistory/User/${userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Fetched data:', data);
                const filteredData = data.filter(booking => booking.bookingStatesId === 3);
                setBookings(filteredData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="order-list">
            <h1>訂單紀錄</h1>
            {bookings.length === 0 ? (
                <p>目前沒有訂單記錄。</p>
            ) : (
                bookings.map((booking, index) => (
                    <div className="order-item" key={`${booking.bookingId}-${index}`}>
                        <h2>{booking.activityName}</h2>
                        <p>價格: NTS {booking.price}</p>
                        <p className="fontcolor">{booking.activityDescription}</p>
                        <AddReview userId={userId} activityId={booking.activityId} />
                    </div>
                ))
            )}
        </div>
    );
};

export default OrderList;
