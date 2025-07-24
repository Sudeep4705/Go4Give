import { useNavigate } from "react-router-dom";

function Hero() {

  const navigate = useNavigate()
  const btnhandle = ()=>{
  navigate("/index")
  }
  return (
    <div
      style={{
        position: "relative",
        backgroundImage: `url("/images/about.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "0 20px",
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Darken the background
          zIndex: 1,
        }}
      ></div>

      {/* Content */}
      <div style={{ zIndex: 2 }}>
        <h1 style={{ fontSize: "4rem", fontWeight: "700" }}>
          Join Us. <br /> Change Their World.
        </h1>
        <p
          style={{
            fontSize: "1.5rem",
            marginTop: "1rem",
            maxWidth: "700px",
          }}
        >
          Change Yours. This Will Change Everything.
        </p>
       <button
  style={{
    marginTop: "2rem",
    padding: "clamp(12px, 2.5vw, 16px) clamp(28px, 5vw, 44px)",
    fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
    fontWeight: 700,
    letterSpacing: "0.5px",
    color: "#fff",
    border: "none",
    borderRadius: 50,
    cursor: "pointer",
    background: "linear-gradient(135deg,#ff5a00 0%, #ff7832 100%)",
    boxShadow:
      "0 4px 14px rgba(255,90,0,.45), 0 0 0 0 rgba(255,90,0,.4)",
    transform: "translateY(0)",
    transition:
      "transform .15s ease, box-shadow .15s ease, background .2s ease",
    outline: "none",
  }}
  onClick={btnhandle}
  onMouseEnter={(e) => {
    e.currentTarget.style.boxShadow =
      "0 6px 20px rgba(255,90,0,.55), 0 0 0 4px rgba(255,90,0,.15)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.boxShadow =
      "0 4px 14px rgba(255,90,0,.45), 0 0 0 0 rgba(255,90,0,.4)";
  }}
  onMouseDown={(e) => {
    e.currentTarget.style.transform = "translateY(2px)";
    e.currentTarget.style.boxShadow =
      "0 2px 8px rgba(255,90,0,.35), 0 0 0 0 rgba(255,90,0,.4)";
  }}
  onMouseUp={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow =
      "0 6px 20px rgba(255,90,0,.55), 0 0 0 4px rgba(255,90,0,.15)";
  }}
  onFocusVisible={(e) => {
    e.currentTarget.style.boxShadow =
      "0 0 0 3px #fff, 0 0 0 6px #ff5a00";
  }}
  onBlur={(e) => {
    e.currentTarget.style.boxShadow =
      "0 4px 14px rgba(255,90,0,.45), 0 0 0 0 rgba(255,90,0,.4)";
  }}
>
  DONATE NOW
</button>
      </div>
    </div>
  );
}

export default Hero;
