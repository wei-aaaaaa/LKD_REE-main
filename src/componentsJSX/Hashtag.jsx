// HashtagTag.jsx

import React from 'react';
import './HashtagTag.css'; // 如果需要自定义CSS，请引入

const HashtagTag = ({ text }) => {
  return (
    <div className="hashtag-tag">
      #{text}
    </div>
  );
};

export default HashtagTag;
