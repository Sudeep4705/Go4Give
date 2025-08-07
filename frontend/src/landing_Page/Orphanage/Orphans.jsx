import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Orphanage() {
  const [data, setData] = useState([]);

  const handlechange = async () => {
    try {
      const res = await axios.get("http://localhost:8000/listing/index");
      setData(res.data);
    } catch (error) {
      console.error("Error fetching orphanage data:", error);
    }
  };

  useEffect(() => {
    handlechange();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div
        style={{
          position: "relative",
          backgroundImage: `url("/images/orphan.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "60vh",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(to bottom right, rgba(0,0,0,0.7), rgba(0,0,0,0.3))",
            zIndex: 1,
          }}
        ></div>

        <div style={{ zIndex: 2 }}>
          <h1 style={{ fontSize: "3rem", fontWeight: "700", textShadow: "2px 2px #000" }}>
            Orphanage Support
          </h1>
          <p style={{ fontSize: "1.3rem", maxWidth: "700px", textShadow: "1px 1px #000" }}>
            "Giving is not just about making a donation. It is about making a difference."
            <br />
            <strong>- Kathy Calvin</strong>
          </p>
        </div>
      </div>

      {/* Page Background */}
      <div
        style={{
          background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
          minHeight: "100vh",
          padding: "4rem 0",
        }}
      >
        <div className="container">
          <div className="row g-5">
            {data.map((orphan, index) => (
              <div className="col-12 col-md-6 col-lg-4" key={index}>
                <Link to={`/show/${orphan._id}`} style={{ textDecoration: "none" }}>
                  <div
                    className="card h-100 border-0 shadow"
                    style={{
                      borderRadius: "20px",
                      overflow: "hidden",
                      background: "linear-gradient(to bottom right, #f7f8fa, #dee2e6)",
                      transition: "transform 0.3s, box-shadow 0.3s",
                    }}
                 
                  >
                    <img
                      src={orphan.image?.url || "/images/default.jpg"}
                      className="card-img-top"
                      alt="Orphan"
                      style={{ height: "220px", objectFit: "cover" }}
                    />
                    <div
                      className="card-body"
                      style={{
                        background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
                        color: "#343a40",
                        padding: "20px",
                      }}
                    >
                      <h5 className="card-title" style={{ color: "#0d6efd", fontWeight: "bold" }}>
                        {orphan.name}
                      </h5>
                      <p className="card-text mb-1">
                        <strong>Type:</strong> {orphan.type}
                      </p>
                      <p className="card-text mb-1">
                        <strong>City:</strong> {orphan.city}
                      </p>
                      <p className="card-text">
                        <strong>State:</strong> {orphan.state}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Orphanage;
