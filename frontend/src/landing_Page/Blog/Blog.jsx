// src/pages/Blog.jsx
import React from "react";
import { Link } from "react-router-dom";

function Blog() {

  
  return (
    <div>
      
      <section
        className="py-5"
        style={{
          background: "linear-gradient(135deg,#ff9a9e 0%,#fad0c4 100%)",
        }}
      >
        <div className="container text-center">
          <h1 className="display-4 fw-bold text-white">Go4Give Blog</h1>
          <p className="lead text-white-50 mb-0">
            Stories, updates and impact reports from our journey to help every
            orphaned child thrive.
          </p>
        </div>
      </section>

      
       <section className="py-5">
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-lg-8 text-center">
        <h2 className="fw-bold mb-3" style={{ color: "#00c4b4" }}>
          Ready to Make an Impact?
        </h2>
        <p className="lead mb-4" style={{ color: "#555" }}>
          Every small act of kindness creates ripples of change. By donating
          through Go4Give, you provide meals, education, and a brighter future
          to orphaned and neglected children.
          <br />
          <strong>Join 12,000+ donors who have already changed 340 young lives.</strong>
        </p>
        <Link
          to="/index"
          className="btn btn-lg text-white fw-bold"
          style={{
            background: "linear-gradient(135deg,#ff5a00 0%,#ff7832 100%)",
            borderRadius: "50px",
            padding: "14px 36px",
            boxShadow: "0 6px 20px rgba(255,90,0,.35)",
            transition: "transform .2s",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "translateY(-2px)")}
          onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
        >
          Donate Now
        </Link>
      </div>
    </div>
  </div>
</section>

 
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h3 className="fw-bold mb-3">Stay Updated</h3>
          <p className="mb-4">
            Get monthly impact stories and upcoming events straight to your
            inbox.
          </p>
          
        </div>
      </section>
    </div>
  );
};

export default Blog;