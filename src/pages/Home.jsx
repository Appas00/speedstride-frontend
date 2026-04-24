import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

import sport1 from "../assets/images/sport1.png";
import sport2 from "../assets/images/sport2.png";
import sport3 from "../assets/images/sport3.png";

const slides = [
  { image: sport1, bg: "#000000", title: "PURE SPEED",      subtitle: "Engineered for peak performance", textColor: "#ffffff" },
  { image: sport3, bg: "#eaffea", title: "ECO PERFORMANCE", subtitle: "Power meets sustainability",      textColor: "#064e3b" },
  { image: sport2, bg: "#fff8dc", title: "LIGHT COMFORT",   subtitle: "Run longer. Feel lighter.",       textColor: "#1e293b" },
];

const Home = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();  // ← add this

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const active = slides[index];

  return (
    <section className="hero-full" style={{ backgroundColor: active.bg }}>

      <img
        key={index}
        src={active.image}
        alt="SpeedStride Shoe"
        className="hero-bg-image slide-enter"
      />

      <div className="hero-overlay" />

      <div
        key={`text-${index}`}
        className="hero-text-left text-animate"
        style={{ color: active.textColor }}
      >
        <h1>{active.title}</h1>
        <p>{active.subtitle}</p>
        <button
          className="hero-btn"
          onClick={() => navigate("/products")}  // ← add this
        >
          Shop Now
        </button>
      </div>

    </section>
  );
};

export default Home;