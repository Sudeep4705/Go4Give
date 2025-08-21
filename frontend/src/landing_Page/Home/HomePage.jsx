

import Hero from "./Hero";
import LeftSection from "./LeftSection";
import Middle from "./Middle";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={{ position: "relative" }}>
      {/* Sections */}
      <Hero />
      <LeftSection />
      <Middle />
      

      {/* Floating Chat Icon */}
      <div
        onClick={() => navigate("/chatbot")}
        style={{
          position: "fixed",
          bottom: "25px",
          right: "25px",
          width: "65px",
          height: "65px",
          background: "linear-gradient(135deg, #4f46e5, #3b82f6)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "28px",
          cursor: "pointer",
          boxShadow: "0 6px 12px rgba(0,0,0,0.25)",
          animation: "pulse 1.5s infinite",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          zIndex: 1000, // stays above all sections
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.25)";
        }}
      >
        💬
      </div>

      {/* Animation Style */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
}

export default HomePage;
