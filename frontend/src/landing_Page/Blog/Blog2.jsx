// src/pages/Blog2.jsx
import React from "react";

function Blog2(){

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
          Monthly Impact Report – July 2025
        </h1>

        {/* Date & Author */}
        <p className="text-muted">
          July 28, 2025 • by <strong>Go4Give Team</strong>
        </p>

        {/* Featured Image */}
        <img
          src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80"
          alt="July Impact Report"
          className="img-fluid rounded mb-4"
        />

        {/* Blog Content */}
        <div className="lead" style={{ color: "#444", lineHeight: "1.8" }}>
          <p>
            July was a month of incredible growth and transformation for our
            Go4Give community. Together with our donors, partners, and volunteers,
            we were able to extend our reach and impact more children than ever before.
          </p>

          <h3 className="mt-4 mb-3">Key Highlights</h3>
          <ul>
            <li><strong>Education Kits:</strong> Distributed 250+ school kits, ensuring children are ready for the new academic year.</li>
            <li><strong>Meal Program Expansion:</strong> Added 3 new orphanages to our daily meal plan, providing over 1,200 nutritious meals this month.</li>
            <li><strong>Healthcare Access:</strong> Conducted 5 medical camps, offering free check-ups and vaccinations to 400 children.</li>
          </ul>

          <h3 className="mt-4 mb-3">Our Growing Family</h3>
          <p>
            July saw 1,800 new donors joining our mission, bringing the total to over 
            12,000 passionate individuals who believe in making a difference. Together,
            we've positively impacted 340+ young lives.
          </p>

          <h3 className="mt-4 mb-3">Looking Ahead</h3>
          <p>
            As we move into August, we’re focused on expanding our vocational training 
            program for older children, giving them tools to build independent futures. 
            We’re also working on partnerships to provide better mental health support.
          </p>

          <p>
            Your generosity fuels this mission. Each contribution, no matter the size, 
            helps us build a world where no child is left behind.
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
            Donate Now & Keep the Momentum
          </a>
        </div>
      </div>
    </div>
  );
}

export default Blog2;  
