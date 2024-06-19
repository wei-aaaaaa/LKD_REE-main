import React from 'react';
import './PhotoDesc.css'; // 如果需要自定义CSS

const PhotoDesc = ({ images }) => {
  return (
    <div className="photo-desc">
      {images.map((image, index) => (
        <div key={index} className="photo-desc-item">
          <img src={image.src} alt={`Image ${index + 1}`} className="photo-img" />
          <p className="photo-description">{image.description}</p>
        </div>
      ))}
    </div>
  );
};

export default PhotoDesc;
