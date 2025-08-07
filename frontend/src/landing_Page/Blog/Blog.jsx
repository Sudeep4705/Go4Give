// src/pages/Blog.jsx
import React from "react";
import { Link } from "react-router-dom";

function Blog() {
  const posts = [
    {
      id: 1,
      title: "How Go4Give Changed Riya’s Life",
      excerpt:
        "Riya, once struggling for basic necessities, now dreams of becoming a doctor thanks to your generous support...",
      image:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 2,
      title: "Monthly Impact Report – July 2025",
      excerpt:
        "From providing education kits to expanding our meal program, here’s how your contributions made an impact this month...",
      image:
        "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 3,
      title: "Volunteer Spotlight: Meet Aarav",
      excerpt:
        "Aarav shares his story of volunteering with Go4Give and the joy of making a difference in the lives of children...",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=60",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section
        className="py-5 text-center"
        style={{
          background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
          color: "white",
        }}
      >
        <div className="container">
          <h1 className="display-4 fw-bold">Go4Give Blog</h1>
          <p className="lead text-white-50 mb-0">
            Stories, updates, and impact reports from our journey to help every
            orphaned child thrive.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="fw-bold text-center mb-5" style={{ color: "#333" }}>
            Latest Stories
          </h2>
          <div className="row g-4">
            {posts.map((post) => (
              <div key={post.id} className="col-md-4">
                <div className="card h-100 shadow-sm border-0 rounded-3">
                  <img
                    src={post.image}
                    className="card-img-top"
                    alt={post.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text text-muted">{post.excerpt}</p>
                    <Link to={`/blog/${post.id}`} className="btn btn-outline-primary">
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 text-center">
        <div className="container">
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
      </section>

      {/* Newsletter
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h3 className="fw-bold mb-3">Stay Updated</h3>
          <p className="mb-4">
            Get monthly impact stories and upcoming events straight to your inbox.
          </p>
          <form className="d-flex justify-content-center">
            <input
              type="email"
              className="form-control w-50 me-2"
              placeholder="Enter your email"
            />
            <button type="submit" className="btn btn-primary">
              Subscribe
            </button>
          </form>
        </div>
      </section> */}
    </div>
  );
}

export default Blog;
