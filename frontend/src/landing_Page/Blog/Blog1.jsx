// src/pages/Blog1.jsx
import React from "react";

function Blog1() {
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

      {/* Blog Content */}
      <div className="container py-5">
        {/* Blog Title */}
        <h1 className="fw-bold mb-3" style={{ color: "#ff5a00" }}>
          How Go4Give Changed Riya’s Life
        </h1>

        {/* Date & Author */}
        <p className="text-muted">
          July 15, 2025 • by <strong>Go4Give Team</strong>
        </p>

        {/* Featured Image */}
        <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80"
          alt="Riya's Journey"
          className="img-fluid rounded mb-4"
        />

        {/* Blog Content */}
        <div className="lead" style={{ color: "#444", lineHeight: "1.8" }}>
          <p>
            Riya’s story is one of hope, resilience, and the life-changing power
            of kindness. At just eight years old, Riya faced a reality no child
            should ever endure — losing both her parents and struggling to meet
            her most basic needs. 
          </p>

          <p>
            Through the support of our generous donors, Riya found a home in one
            of our partner orphanages. She now receives nutritious meals, proper
            education, and the warmth of a safe and loving environment. Her once
            uncertain future is now filled with possibilities — she dreams of
            becoming a doctor to help other children in need.
          </p>

          <h3 className="mt-4 mb-3">Your Impact</h3>
          <p>
            Every donation, no matter how small, creates ripples of change.
            Riya’s journey is a testament to the 12,000+ donors who believe that
            every child deserves a chance to thrive. Together, we have already
            changed the lives of 340 children like Riya — and this is just the
            beginning.
          </p>

          <h3 className="mt-4 mb-3">What’s Next?</h3>
          <p>
            Go4Give continues to expand its programs, reaching more orphaned and
            neglected children every month. With your continued support, we can
            ensure that no child is left behind, and every child gets the
            opportunity to dream, learn, and grow.
          </p>

          <p>
            Join us in our mission. Together, we can make stories like Riya’s the
            norm, not the exception.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-5">
          <a
            href="/index"
            className="btn btn-lg text-white fw-bold"
            style={{
              background: "linear-gradient(135deg,#ff5a00 0%,#ff7832 100%)",
              borderRadius: "50px",
              padding: "14px 36px",
              boxShadow: "0 6px 20px rgba(255,90,0,.35)",
            }}
          >
            Donate Now & Change Lives
          </a>
        </div>
      </div>
    </div>
  );
}

export default Blog1;
