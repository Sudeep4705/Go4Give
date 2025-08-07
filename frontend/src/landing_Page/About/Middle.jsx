import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Middle.css"; // optional custom CSS

function Middle() {
  return (
    <section className="mission-vision py-5">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="fw-bold hero-title">
            Empowering Lives Through Kindness
          </h1>
          <p className="lead text-muted col-lg-7 mx-auto">
            Our mission and vision guide everything we do. Learn how your support
            creates lasting impact.
          </p>
        </div>

        {/* Mission */}
        <div className="row g-4 align-items-center mb-5">
          <div className="col-lg-6 order-lg-1">
            <img
              src="/images/child.jpg"
              alt="Orphanage support"
              className="img-fluid rounded-4 shadow"
            />
          </div>
          <div className="col-lg-6">
            <div className="card border-0 rounded-4 h-100 shadow-sm hover-lift">
              <div className="card-body p-lg-4">
                <h4 className="fw-bold text-danger mb-3">Our Mission</h4>
                <p className="mb-0">
                  Go4Give enables direct, life-changing support for orphaned children 
                  and neglected elders. Every donation contributes to **nutritious food, 
                  quality education, safe shelter, and essential healthcare**, ensuring 
                  they can live with dignity and hope.
                  <br /><br />
                  We are committed to removing the barriers that often prevent help from 
                  reaching the right hands. By partnering with trusted NGOs, we ensure that 
                  **100% of every contribution makes a real difference**.
                  <br /><br />
                  Beyond meeting immediate needs, our mission is to create 
                  opportunities for growth from skill-building workshops to mentorship 
                  programs  so beneficiaries can become self-reliant and empowered members 
                  of their communities.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Vision */}
        <div className="row g-4 align-items-center mb-5">
          <div className="col-lg-6 order-lg-2">
            <img
              src="/images/child2.jpg"
              alt="Vision for children"
              className="img-fluid rounded-4 shadow"
            />
          </div>
          <div className="col-lg-6 order-lg-1">
            <div className="card border-0 rounded-4 h-100 shadow-sm hover-lift">
              <div className="card-body p-lg-4">
                <h4 className="fw-bold text-primary mb-3">Our Vision</h4>
                <p className="mb-0">
                  We envision a future where **kindness knows no distance**  where 
                  every act of generosity reaches those who need it most, instantly 
                  and transparently.
                  <br /><br />
                  At Go4Give, we strive to build a global community of compassionate 
                  donors, passionate volunteers, and reliable partner organizations 
                  who work together to transform lives.
                  <br /><br />
                  Our vision is to replace charity with **connection**  to move beyond 
                  transactions and create lasting relationships between donors and 
                  beneficiaries. Through technology, trust, and human touch, we aim to 
                  create a **world where no child is left without care, and no elder is 
                  left without dignity**.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How We Work */}
        <div
          className="rounded-4 p-4 p-lg-5 shadow-sm"
          style={{ background: "linear-gradient(135deg,#667eea 0%,#764ba2 100%)" }}
        >
          <h2 className="text-center fw-bold mb-4" style={{ color: "#fff" }}>
            How We Work
          </h2>
          <ul className="list-unstyled row g-3 text-center">
            {[
              "Campaigns: Verified NGOs launch cause-specific campaigns.",
              "Donors: Individuals contribute directly with money, goods, or time.",
              "Impact Tracking: Get clear updates on where your donations go.",
              "Relationship Building: Long-term support and adoption options available.",
            ].map((txt, idx) => (
              <li key={idx} className="col-md-6 col-lg-3">
                <div
                  className="p-3 rounded-3 h-100"
                  style={{
                    background: "#ffffff26",
                    color: "#fff",
                    border: "1px solid #ffffff40",
                  }}
                >
                  {txt}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Middle;
