// src/pages/Blog3.jsx
import React from "react";

function Blog3() {
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
          Volunteer Spotlight: Meet Aarav
        </h1>

        {/* Date & Author */}
        <p className="text-muted">
          July 29, 2025 • by <strong>Go4Give Team</strong>
        </p>

        {/* Featured Image */}
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
          alt="Volunteer Aarav"
          className="img-fluid rounded mb-4"
        />

        {/* Blog Content */}
        <div className="lead" style={{ color: "#444", lineHeight: "1.8" }}>
          <p>
            Behind every successful Go4Give initiative, there are passionate
            volunteers who dedicate their time and energy to make a difference.
            This month, we shine the spotlight on Aarav, one of our most
            committed volunteers.
          </p>

          <h3 className="mt-4 mb-3">Aarav’s Journey</h3>
          <p>
            Aarav joined Go4Give in early 2024, driven by a deep desire to give
            back to society. Since then, he has been actively involved in
            organizing fundraising events, mentoring children, and coordinating
            donation drives. His positive attitude and willingness to go the
            extra mile have inspired everyone around him.
          </p>

          <h3 className="mt-4 mb-3">Making a Real Impact</h3>
          <p>
            Over the past year, Aarav has personally helped connect more than 50
            donors to our programs, directly impacting the lives of over 120
            children. His dedication proves that one person truly can create
            ripples of lasting change.
          </p>

          <h3 className="mt-4 mb-3">A Message from Aarav</h3>
          <p>
            “Every smile I see on a child’s face makes all the effort worth it.
            Volunteering with Go4Give has taught me that we all have the power
            to change the world — one small act of kindness at a time.”
          </p>

          <p>
            Aarav’s story reminds us that the heart of Go4Give lies in its
            community. Volunteers like him make our mission possible, and we are
            deeply grateful for their support.
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
            Become a Volunteer Today
          </a>
        </div>
      </div>
    </div>
  );
}

export default Blog3;
