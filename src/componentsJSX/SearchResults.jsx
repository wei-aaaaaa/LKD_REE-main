import React from "react";
import { useNavigate } from "react-router-dom";
import "./SearchResults.css";

const SearchResults = ({ results }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/productpage/${id}`);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const truncateDescription = (description) => {
    return description.length > 15
      ? description.substring(0, 15) + "..."
      : description;
  };

  const truncateName = (name) => {
    if (name.length > 17) {
      return name.substring(0, 17) + "...";
    } else if (name.length < 12) {
      return name.padEnd(12, " "); // 補齊到12個字元
    } else {
      return name;
    }
  };

  return (
    <div className="search-results">
      {results.map((result) => (
        <div
          key={result.activityId}
          className="search-result-item"
          onClick={() => handleClick(result.activityId)}
        >
          <img
            src={`data:image/png;base64,${result.photo[0]}`}
            alt={result.name}
          />
          <div className="result-details">
            <h3>{truncateName(result.name)}</h3>
            <p style={{ height: "20px" }}>{formatDate(result.date)}</p>
            <p>{truncateDescription(result.description)}</p>
            <div className="result-meta">
              <span className="price">NT$ {result.price}</span>
              <div className="rating">
                <span className="rating-star">★</span>
                <span className="rating-score">{result.rating}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
