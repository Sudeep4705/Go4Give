import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Orphanage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ loading state

  const handlechange = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/listing/index`
      );
      setData(res.data);
    } catch (error) {
      console.error("Error fetching orphanage data:", error);
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  useEffect(() => {
    handlechange();
  }, []);

  return (
    <>
      {/* Hero Section (same as yours) */}

      <div
        style={{
          background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
          minHeight: "100vh",
          padding: "4rem 0",
        }}
      >
        <div className="container">

          {/* ✅ SHOW LOADING SPINNER */}
          {loading ? (
            <div className="text-center mt-5">
              <div className="spinner-border text-primary" role="status"></div>
              <p className="mt-3">Loading orphanages...</p>
            </div>
          ) : (
            <div className="row g-5">
              {data.map((orphan, index) => (
                <div className="col-12 col-md-6 col-lg-4" key={index}>
                  <Link
                    to={`/show/${orphan._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      className="card h-100 border-0 shadow"
                      style={{
                        borderRadius: "20px",
                        overflow: "hidden",
                        background:
                          "linear-gradient(to bottom right, #f7f8fa, #dee2e6)",
                      }}
                    >
                      <img
                        src={orphan.image?.url || "/images/default.jpg"}
                        className="card-img-top"
                        alt="Orphan"
                        style={{ height: "220px", objectFit: "cover" }}
                      />
                      <div className="card-body">
                        <h5
                          className="card-title"
                          style={{ color: "#0d6efd", fontWeight: "bold" }}
                        >
                          {orphan.name}
                        </h5>
                        <p><strong>Type:</strong> {orphan.type}</p>
                        <p><strong>City:</strong> {orphan.city}</p>
                        <p><strong>State:</strong> {orphan.state}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Orphanage;
