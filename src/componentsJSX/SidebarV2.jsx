import React, { useState, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./SidebarV2.css";
// import MyGoogleMap from "./MyGoogleMap"; // Import MyGoogleMap component

const SidebarV2 = ({ setFilters }) => {
  const [locationFilters, setLocationFilters] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleFilterChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setLocationFilters((prevFilters) => [...prevFilters, value]);
    } else {
      setLocationFilters((prevFilters) =>
        prevFilters.filter((filter) => filter !== value)
      );
    }
  };

  const handlePriceRangeChange = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      priceRange: { min: Number(minPrice), max: Number(maxPrice) },
    }));
  };

  const handleDateRangeChange = useCallback(
    (dates) => {
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
    },
    [setFilters]
  );

  const handleClearFilters = () => {
    setFilters({});
    setLocationFilters([]);
    setMinPrice("");
    setMaxPrice("");
    setStartDate(null);
    setEndDate(null);
    document
      .querySelectorAll('input[type="checkbox"]')
      .forEach((checkbox) => {
        checkbox.checked = false;
      });
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
