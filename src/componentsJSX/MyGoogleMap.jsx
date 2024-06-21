import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import './MyGoogleMap.css'; // 引入您的 CSS 文件

const containerStyle = {
    width: '100%', // 调整为适合您的需求的宽度
    height: '90vh' // 调整为适合您的需求的高度
};

const center = {
    lat: 25.0374865,
    lng: 121.5647688
};

const MyGoogleMap = () => {
    const [currentLocation, setCurrentLocation] = useState(center);
    const [carActivities, setCarActivities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [map, setMap] = useState(null);
    const [loading, setLoading] = useState(true);
    const [locationError, setLocationError] = useState(null);
    const [hoveredActivity, setHoveredActivity] = useState(null);

    const onLoad = useCallback(function callback(map) {
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    const handleActivityClick = (activity) => {
        window.location.href = `/ProductPage/${activity.activityId}`;
    };

    const handleActivityHover = (activity) => {
        setHoveredActivity(activity);
    };

    const handleActivityHoverLeave = () => {
        setHoveredActivity(null);
    };

    const handleCurrentLocationClick = () => {
        if (map) {
            map.panTo(currentLocation);
            map.setZoom(12);
        }
        setSelectedActivity(null);
    };

    const calculateDistance = (lat1, lng1, lat2, lng2) => {
        const toRad = (value) => value * Math.PI / 180;
        const R = 6371; // Earth radius in km
        const dLat = toRad(lat2 - lat1);
        const dLng = toRad(lat2 - lng1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                setCurrentLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            }, error => {
                console.error("Error obtaining location", error);
                setLocationError("Error obtaining location.");
            });
        }

        fetch('https://localhost:7148/api/HotActivities/car-activities')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setCarActivities(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching car activities", error);
                setLoading(false);
            });
    }, []);

    const sortedActivities = carActivities
        .map(activity => ({
            ...activity,
            distance: calculateDistance(currentLocation.lat, currentLocation.lng, activity.latitude, activity.longitude)
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3); // 限制为最多三个活动

    return (
        <div className="map-container">
            <div className="product-cards">
                {sortedActivities.map(activity => (
                    <div key={activity.activityId} className="card" onClick={() => setCurrentLocation({ lat: activity.latitude, lng: activity.longitude })}>
                        <img src={`data:image/jpeg;base64,${activity.albums && activity.albums.length > 0 ? activity.albums[0] : ''}`} className="card-img" alt={activity.name} />
                        <div className="card-body">
                            <h5 className="card-title">{activity.name}</h5>
                            <p className="card-text">{activity.price} NT$</p>
                        </div>
                    </div>
                ))}
                {locationError && <p className="text-danger">{locationError}</p>}
            </div>
            <div className="map-wrapper">
                <div className="map">
                    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={currentLocation}
                            zoom={12}
                            onLoad={onLoad}
                            onUnmount={onUnmount}
                        >
                            {sortedActivities.map(activity => {
                                const isValidLatitude = typeof activity.latitude === 'number' && !isNaN(activity.latitude);
                                const isValidLongitude = typeof activity.longitude === 'number' && !isNaN(activity.longitude);

                                return isValidLatitude && isValidLongitude ? (
                                    <Marker
                                        key={activity.activityId}
                                        position={{ lat: activity.latitude, lng: activity.longitude }}
                                        title={activity.name}
                                        onClick={() => handleActivityClick(activity)}
                                        onMouseOver={() => handleActivityHover(activity)}
                                        onMouseOut={handleActivityHoverLeave}
                                    >
                                        {hoveredActivity === activity && (
                                            <InfoWindow onCloseClick={handleActivityHoverLeave}>
                                                <div>
                                                    <h6>{activity.name}</h6>
                                                    <p>{activity.description}</p>
                                                </div>
                                            </InfoWindow>
                                        )}
                                    </Marker>
                                ) : null;
                            })}
                            <Marker
                                key="current-location"
                                position={currentLocation}
                                title="Your Current Location"
                                icon={{ url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" }}
                            />
                        </GoogleMap>
                    </LoadScript>
                    <button className="btn btn-primary current-location-btn" onClick={handleCurrentLocationClick}>返回我的定位</button>
                </div>
            </div>
        </div>
    );
};

export default MyGoogleMap;
