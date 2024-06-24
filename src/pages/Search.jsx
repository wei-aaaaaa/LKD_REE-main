import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import SidebarV2 from "../componentsJSX/SidebarV2";
import SearchResults from "../componentsJSX/SearchResults";
import Pagination from "../componentsJSX/Pagination";
import Loader from "../componentsJSX/Loader"; // 引入Loader組件
import "./Search.css";
import backgroundImage from "../assets/images/contact/sectionBG.jpg";

const Search = () => {
    const [filters, setFilters] = useState({});
    const [sortOrder, setSortOrder] = useState("Lookday 推薦");
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage] = useState(12); // 每頁顯示12筆結果
    const location = useLocation();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const queryParams = new URLSearchParams(location.search);
    const queries = useMemo(
        () => queryParams.getAll("query"),
        [location.search]
    );

    const sortResults = (results, order) => {
        switch (order) {
            case "價格低到高":
                return results.sort((a, b) => a.price - b.price);
            case "價格高到低":
                return results.sort((a, b) => b.price - a.price);
            case "評分最高":
                return results.sort((a, b) => b.rating - a.rating);
            default:
                return results;
        }
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                "https://localhost:7148/api/ActivityWithAlbum/"
            );
            if (!response.ok) {
                throw new Error(`Http error! Status: ${response.status}`);
            }
            const data = await response.json();

            const filteredResults = data.filter((item) => {
                const matchesQuery =
                    queries.length > 0
                        ? queries.some(
                              (query) =>
                                  item.name.includes(query) ||
                                  item.description.includes(query)
                          )
                        : true;
                const matchesFilters = Object.keys(filters).every(
                    (filterKey) => {
                        if (filterKey === "priceRange") {
                            return (
                                item.price >= filters.priceRange.min &&
                                item.price <= filters.priceRange.max
                            );
                        }
                        if (filterKey === "dateRange") {
                            const itemDate = new Date(item.date);
                            const startDate = filters.dateRange.start
                                ? new Date(filters.dateRange.start)
                                : null;
                            const endDate = filters.dateRange.end
                                ? new Date(filters.dateRange.end)
                                : null;
                            return (
                                (!startDate || itemDate >= startDate) &&
                                (!endDate || itemDate <= endDate)
                            );
                        }
                        if (filterKey === "locations") {
                            return filters.locations.includes(item.location);
                        }
                        return true;
                    }
                );

                return matchesQuery && matchesFilters;
            });

            const sortedResults = sortResults(filteredResults, sortOrder);
            setResults(sortedResults);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [filters, sortOrder, queries]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="search-page">
            <header
                className="search-header"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <div className="header-content">
                    <h1>
                        {queries.length > 0 ? queries.join(", ") : "景點門票"}
                    </h1>
                    <p>探索主題樂園、博物館等眾多必遊景點</p>
                </div>
            </header>
            <div className="search-content">
                <SidebarV2 setFilters={setFilters} />
                <div className="search-results-wrapper">
                    <div className="search-controls">
                        <span>找到 {results.length} 項結果</span>
                        <div className="search-sort">
                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                            >
                                <option value="Lookday 推薦">
                                    Lookday 推薦
                                </option>
                                <option value="價格低到高">價格低到高</option>
                                <option value="價格高到低">價格高到低</option>
                                <option value="評分最高">評分最高</option>
                            </select>
                        </div>
                    </div>
                    <div className="search-results-container">
                        {loading ? (
                            <div className="loading-container">
                                <div className="loader-container">
                                    <Loader />
                                </div>
                            </div>
                        ) : results.length === 0 ? (
                            <div className="no-results">
                                <p>搜索結果為 0，請重新搜索。</p>
                            </div>
                        ) : (
                            <div className="search-results-parent">
                                <SearchResults results={currentResults} />
                            </div>
                        )}
                    </div>
                    <Pagination
                        resultsPerPage={resultsPerPage}
                        totalResults={results.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                </div>
            </div>
        </div>
    );
};

export default Search;
