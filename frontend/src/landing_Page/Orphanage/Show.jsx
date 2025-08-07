import { useNavigate, useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import "./Show.css"
import Review from "./Review";
function Show() {
  const { id } = useParams(); 
  const [data, setdata] = useState(null);

  const navigate  =  useNavigate()
  const handchange =(donationId)=>{
  navigate(`/donation/${donationId}`);
  }
  
  useEffect(() => {
    axios
      .get(`http://localhost:8000/listing/show/${id}`)
      .then((res) => setdata(res.data))
      .catch((error) => console.log(error));
  }, [id]);


  if (!data) {
    return <p>Loading...</p>;
  }


  return (
    <>
  
    <div
  style={{
    position: "relative",
    backgroundImage: `url("/images/show.jpg")`,
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
    overflow: "hidden",
    fontFamily: "'Poppins', sans-serif",
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
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: 1,
    }}
  ></div>

  {/* Content */}
  <div
    style={{
      zIndex: 2,
      backdropFilter: "blur(10px)",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      padding: "30px 40px",
      borderRadius: "20px",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
      animation: "fadeIn 1.5s ease-in-out",
      maxWidth: "800px",
    }}
  >
    <h1 style={{ fontSize: "3rem", marginBottom: "20px", fontWeight: 700 }}>
      Welcome to Our Show
    </h1>
    <p style={{ fontSize: "1.2rem", lineHeight: "1.6" }}>
      Discover inspiring stories, passionate missions, and the real impact being made by orphanages and old-age homes.
    </p>
    
  </div>

  {/* Fade-in animation keyframes */}
  <style>
    {`
      @keyframes fadeIn {
        0% {
          opacity: 0;
          transform: translateY(30px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `}
  </style>
</div>

<div
  style={{
    maxWidth: "99%",
    margin: "80px auto",
    display: "flex",
    flexWrap: "wrap",
    background: "linear-gradient(to right, #ffffff, #f8f9ff)",
    // backgroundColor: "#eef6fb",
    borderRadius: "24px",
    overflow: "hidden",
    boxShadow: "0 12px 48px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Poppins', sans-serif",
  }}
>
  {/* Left: Image */}
  <div
    style={{
      flex: "1 1 45%",
      minHeight: "400px",
      position: "relative",
    }}
  >
    <img
      src={data.image.url}
      alt={data.name}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        filter: "brightness(0.95)",
      }}
    />
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(to bottom right, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0))",
      }}
    ></div>
  </div>

  {/* Right: Content */}
  <div
    style={{
      flex: "1 1 55%",
      padding: "50px 40px",
      background: "rgba(255, 255, 255, 0.6)",
      backdropFilter: "blur(8px)",
    }}
  >
    <h2
      style={{
        fontSize: "2.4rem",
        marginBottom: "8px",
        fontWeight: 700,
        color: "#2c2c54",
      }}
    >
      {data.name}
    </h2>
    <p style={{ fontSize: "1.05rem", color: "#555", marginBottom: "16px" }}>
      <strong>Register Number:</strong> {data.regNo}
    </p>
    <p style={{ color: "#444", lineHeight: "1.7", marginBottom: "18px" }}>
      <strong>Address:</strong> {data.address}
    </p>
    <p style={{ color: "#444", lineHeight: "1.7", marginBottom: "24px" }}>
      <strong>Additional information:</strong> {data.info}
    </p>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "10px 20px",
        color: "#333",
        marginBottom: "32px",
      }}
    >
      <div><strong>Type:</strong> {data.type}</div>
      <div><strong>Founded:</strong> {data.fnd.slice(0, 10)}</div>
      <div><strong>City:</strong> {data.city}</div>
      <div><strong>State:</strong> {data.state}</div>
    </div>

    <button
      style={{
        padding: "14px 32px",
        background:
          "linear-gradient(to right, #6a11cb, #2575fc)",
        color: "#fff",
        fontSize: "1.1rem",
        border: "none",
        borderRadius: "40px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        boxShadow: "0 8px 20px rgba(106, 17, 203, 0.3)",
      }}
      onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
      onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
      onClick={() => handchange(data._id || id)}
      
    >
       Donate Now
    </button>
  </div>
</div>
{/* viideo */}
<div className="row align-items-center my-5">
  {/* Video Section */}
  <div className="col-lg-5 col-md-6 mb-4 mb-md-0">
    <div
      className="p-4 rounded-4 shadow"
      style={{
        background: "linear-gradient(145deg, #e8eafc, #f1f3fc)",
        border: "1px solid #dee2e6",
      }}
    >
      <h5 className="text-center fw-semibold mb-3 text-primary-emphasis">
        Orphanage Introduction Video
      </h5>
      <div className="ratio ratio-16x9 rounded-3 overflow-hidden">
        <video
          src={data.video.url}
          className="w-100 h-100"
          controls
          poster="/preview-thumbnail.jpg"
        />
      </div>
    </div>
  </div>

  {/* Quote Section */}
  <div className="col-lg-7 col-md-6 ps-md-5 d-flex flex-column justify-content-center text-center text-md-start">
    <h1
      className="fw-bold mb-3"
      style={{
        fontSize: "2.8rem",
        color: "#1a73e8",
        lineHeight: "1.3",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      Every child deserves a safe<br />
      place to grow, dream, and thrive.
    </h1>
    <p
      className="fs-5"
      style={{
        fontStyle: "italic",
        color: "#555",
        fontWeight: 500,
      }}
    >
      – Orphanage Care Initiative
    </p>
  </div>
</div>

<Review listingId={id}/>

</>
  ) 
}

export default Show;
