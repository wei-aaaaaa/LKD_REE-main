import React from "react";
import { useRef, useState, useEffect } from "react";
import "./AuPage.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AULoader from "../componentsJSX/AUloader";

const AuPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const nameParam = searchParams.get("name");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(
            "https://localhost:7148/api/UserVerify/GetVerify?username=" +
                nameParam
        );
        setTimeout(() => {
            navigate("/");
        }, 20000);
    }, []);
    console.log(nameParam);
    return (
        <div className="au-page">
            <h1>驗證成功！</h1>
            <p>歡迎回來，您已成功驗證。</p>
            <p>即將跳轉至首頁...</p>
            <AULoader></AULoader>
        </div>
    );
};

export default AuPage;
