import { NavigationType, useNavigate } from "react-router-dom";
function Middle() {
  const navigate = useNavigate()
const  Navigation=()=>{
  navigate("/about")
}

  return (
    <div className="row text-center">
      <div
        style={{
          position: "relative",
          backgroundImage: `url("/images/middle.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "80vh",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "0 20px",
          backgroundRepeat: "no-repeat",
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        {/* Optional semi-transparent dark overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.45)",
            zIndex: 1,
          }}
        ></div>

        {/* Content */}
        <div style={{ zIndex: 2, maxWidth: "900px" }}>
          <p
            style={{
              fontSize: "1.1rem",
              letterSpacing: "1px",
              marginBottom: "10px",
              fontWeight: "500",
              textTransform: "uppercase",
              color: "#b2fef7",
            }}
          >
            Facilities & More
          </p>

          <h1
            style={{
              fontSize: "3.5rem",
              fontWeight: "700",
              marginBottom: "1.5rem",
              color: "#fff",
              letterSpacing: "1px",
            }}
          >
            All Services
          </h1>

          <p
            style={{
              fontSize: "1.15rem",
              lineHeight: "1.8",
              color: "#f0f0f0",
              margin: "0 auto",
              maxWidth: "750px",
            }}
          >
            At <strong>Go4Give</strong>, we believe giving is more than charity
            it’s humanity in action. We connect kind hearts with children and
            elders who need them most. Whether it’s a warm meal, a school
            uniform, or simply love and attention, your small act of kindness
            creates a lasting impact.
          </p>

          <button
          onClick={Navigation}
            style={{
              marginTop: "2rem",
              padding: "12px 32px",
              backgroundColor: "#00c4b4",
              color: "#fff",
              border: "none",
              borderRadius: "30px",
              fontSize: "1rem",
              fontWeight: "600",
              letterSpacing: "0.5px",
              cursor: "pointer",
              boxShadow: "0px 4px 15px rgba(0, 196, 180, 0.4)",
              transition: "background-color 0.3s ease",
            }}
          >
            ABOUT US
          </button>
        </div>
      </div>
    </div>
  );
}

export default Middle;
