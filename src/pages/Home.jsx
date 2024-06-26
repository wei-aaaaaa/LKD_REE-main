import React, { useState, useEffect } from "react";
import PicCarousel from "../componentsJSX/PicCarousel";
import Filterbar from "../componentsJSX/Filterbar";
import PromotionSection from "../componentsJSX/PromotionSection";
import Rank from "../componentsJSX/Rank";
import Area from "../componentsJSX/Area";
import Weather from "../componentsJSX/Weather";
import Redeye from "../componentsJSX/Redeye";
import Loader from "../componentsJSX/Loader";
import MyGoogleMap from "../componentsJSX/MyGoogleMap"; // Corrected import
import Bot from "../componentsJSX/Bot";
import LogoAnimation from "../componentsJSX/LogoAnimation"; // 引入LogoAnimation组件

const Home = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 模拟数据加载
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000); // 3秒后隐藏动画，可以根据实际数据加载时间调整

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {loading ? (
                <LogoAnimation />
            ) : (
                <>
                    <PicCarousel />
                    <Filterbar />
                    <PromotionSection />
                    <Rank />
                    <Area />
                    <Weather />
                    {/* <Redeye /> */}
                    <MyGoogleMap />
                    {/* <Bot /> */}
                </>
            )}
        </>
    );
};

export default Home;
