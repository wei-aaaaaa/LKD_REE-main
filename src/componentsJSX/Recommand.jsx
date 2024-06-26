import React, { useState } from "react";
import "./Recommand.css";

// 假資料
const data = [
  {
    id: 1,
    bgColor: "#ffcc80", // 橘色
    icon: "📷",
    title: "探索玩樂靈感",
    desc: "提供多種值得探索的活動、租車、住宿等體驗，帶你發現世界的精彩。",
  },
  {
    id: 2,
    bgColor: "#ffab91", // 深橘色
    icon: "🥂",
    title: "享 Lookday 會員專屬優惠",
    desc: "註冊會員即可享受會員獨享的優惠和積分獎勵，獲得更多驚喜。",
  },
  {
    id: 3,
    bgColor: "#ff8a65", // 橙紅色
    icon: "📖",
    title: "預訂便捷快速",
    desc: "提供無憂預訂、快速入場和免費取消等服務，讓你的旅程輕鬆無負擔。",
  },
  {
    id: 4,
    bgColor: "#ff7043", // 深橙色
    icon: "🧳",
    title: "優質服務保證",
    desc: "透明的票價和專業的客服，隨時為你提供幫助，確保你的旅行安全無憂。",
  },
  {
    id: 5,
    bgColor: "#ffcc80", // 橘色
    icon: "🌏",
    title: "玩樂品質認證",
    desc: "每一項活動均經過嚴格篩選，保證高品質的體驗，讓你玩得開心，放心無憂。",
  },
];

const Recommand = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const next = () =>
    activeSlide < data.length - 1 && setActiveSlide(activeSlide + 1);
  const prev = () => activeSlide > 0 && setActiveSlide(activeSlide - 1);

  const getStyles = (index) => {
    if (activeSlide === index)
      return {
        opacity: 1,
        transform: "translateX(0px) translateZ(0px) rotateY(0deg)",
        zIndex: 10,
      };
    else if (activeSlide - 1 === index)
      return {
        opacity: 1,
        transform: "translateX(-240px) translateZ(-400px) rotateY(35deg)",
        zIndex: 9,
      };
    else if (activeSlide + 1 === index)
      return {
        opacity: 1,
        transform: "translateX(240px) translateZ(-400px) rotateY(-35deg)",
        zIndex: 9,
      };
    else if (activeSlide - 2 === index)
      return {
        opacity: 1,
        transform: "translateX(-480px) translateZ(-500px) rotateY(35deg)",
        zIndex: 8,
      };
    else if (activeSlide + 2 === index)
      return {
        opacity: 1,
        transform: "translateX(480px) translateZ(-500px) rotateY(-35deg)",
        zIndex: 8,
      };
    else if (index < activeSlide - 2)
      return {
        opacity: 0,
        transform: "translateX(-480px) translateZ(-500px) rotateY(35deg)",
        zIndex: 7,
      };
    else if (index > activeSlide + 2)
      return {
        opacity: 0,
        transform: "translateX(480px) translateZ(-500px) rotateY(-35deg)",
        zIndex: 7,
      };
  };

  return (
    <section className="recommand-section">
      <div className="recommand">
        <div className="slideC">
          {data.map((item, i) => (
            <React.Fragment key={item.id}>
              <div
                className="slide"
                style={{
                  background: item.bgColor,
                  ...getStyles(i),
                }}
              >
                <SliderContent {...item} />
              </div>
              <div
                className="reflection"
                style={{
                  background: `linear-gradient(to bottom, ${item.bgColor}40, transparent)`,
                  ...getStyles(i),
                }}
              />
            </React.Fragment>
          ))}
        </div>
        <div className="btns">
          <div className="btn" onClick={prev}>
            ⬅️
          </div>
          <div className="btn" onClick={next}>
            ➡️
          </div>
        </div>
      </div>
    </section>
  );
};

const SliderContent = (props) => {
  return (
    <div className="sliderContent">
      <div className="icon">{props.icon}</div>
      <h2>{props.title}</h2>
      <p>{props.desc}</p>
    </div>
  );
};

export default Recommand;
