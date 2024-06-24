import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./SidebarV2.css";

const SidebarV2 = ({ setFilters }) => {
  const [locationFilters, setLocationFilters] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // This effect will run once on component mount to set initial filters from URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const locations = queryParams.getAll('query');
    setLocationFilters(locations);
  }, [location.search]);

  const updateUrlParams = (filters) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.delete('query'); // Remove all existing 'query' entries
    filters.forEach(filter => {
      queryParams.append('query', filter); // Append each new filter as 'query' entry
    });
    navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true });
  };

  const handleFilterChange = (e) => {
    const { value, checked } = e.target;
    setLocationFilters((prevFilters) => {
      const newFilters = checked ? [...prevFilters, value] : prevFilters.filter((filter) => filter !== value);
      updateUrlParams(newFilters); // Update URL with new filters
      return newFilters;
    });
  };

  const handlePriceRangeChange = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      priceRange: { min: Number(minPrice), max: Number(maxPrice) },
    }));
  };

  const handleDateRangeChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setFilters((prevFilters) => ({
      ...prevFilters,
      dateRange: {
        start: start ? start.toISOString().split("T")[0] : null,
        end: end ? end.toISOString().split("T")[0] : null,
      },
    }));
  };

  const handleClearFilters = () => {
    setFilters({});
    setLocationFilters([]);
    setMinPrice("");
    setMaxPrice("");
    setStartDate(null);
    setEndDate(null);
    updateUrlParams([]);
  };

  return (
    <div className="filter-sidebar">
      <div className="filter-group">
        <h3>目的地</h3>
        {["台北", "台中", "高雄", "台南", "宜蘭"].map((location) => (
          <label key={location}>
            <input
              type="checkbox"
              name="location"
              value={location}
              checked={locationFilters.includes(location)}
              onChange={handleFilterChange}
            />
            {location}
          </label>
        ))}
      </div>
      <div className="price-range-filter">
        <h3>價格範圍</h3>
        <div className="input-container">
          <input
            type="text"
            placeholder="最低價格"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="最高價格"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <div className="buttons">
          <button className="reset-button" onClick={handleClearFilters}>
            重設
          </button>
          <button className="ok-button" onClick={handlePriceRangeChange}>
            OK
          </button>
        </div>
      </div>
      <div className="date-filter">
        <h3>選擇日期區間</h3>
        <DatePicker
          selected={startDate}
          onChange={handleDateRangeChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          dateFormat="yyyy/MM/dd"
          minDate={new Date()}
          isClearable
          placeholderText="選擇日期區間"
          className="custom-datepicker"
        />
      </div>
    </div>
  );
};

export default SidebarV2;
