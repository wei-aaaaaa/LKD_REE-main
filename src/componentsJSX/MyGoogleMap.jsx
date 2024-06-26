﻿import React, { useState, useCallback, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import "./MyGoogleMap.css";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 25.0374865,
  lng: 121.5647688,
};

const MyGoogleMap = () => {
  const [currentLocation, setCurrentLocation] = useState(center);
  const [carActivities, setCarActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [map, setMap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(null);
  const [hoveredActivity, setHoveredActivity] = useState(null);
  const navigate = useNavigate();

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    setCurrentLocation({
      lat: activity.latitude,
      lng: activity.longitude,
    });
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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error obtaining location", error);
          setLocationError("Error obtaining location.");
        }
      );
    }

    fetch("https://localhost:7148/api/HotActivities/car-activities")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCarActivities(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching car activities", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="map-container">
      <div className="product-cards">
        {selectedActivity && (
          <div
            key={selectedActivity.activityId}
            className="card"
            onClick={() =>
              navigate(`/ProductPage/${selectedActivity.activityId}`)
            }
          >
            <img
              src={`data:image/jpeg;base64,${
                selectedActivity.albums && selectedActivity.albums.length > 0
                  ? selectedActivity.albums[0]
                  : ""
              }`}
              className="card-img"
              alt={selectedActivity.name}
            />
            <div className="card-body">
              <h5 className="card-title">{selectedActivity.name}</h5>
              <p className="card-text">{selectedActivity.price} NT$</p>
            </div>
          </div>
        )}
        {locationError && <p className="text-danger">{locationError}</p>}
        <div className="button-container">
          <button className="btn" onClick={handleCurrentLocationClick}>
            返回我的定位
          </button>
        </div>
      </div>
      <div className="map">
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentLocation}
            zoom={12}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {carActivities.map((activity) => {
              const isValidLatitude =
                typeof activity.latitude === "number" &&
                !isNaN(activity.latitude);
              const isValidLongitude =
                typeof activity.longitude === "number" &&
                !isNaN(activity.longitude);

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
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default MyGoogleMap;