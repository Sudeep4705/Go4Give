import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Middle.css"; // optional custom CSS shown below

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
                  Go4Give enables direct support for orphaned children and the
                  elderly. Every donation contributes to food, education, shelter,
                  and healthcare.
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
                  We envision a future where every act of kindness reaches those
                  who need it most, without barriers or bureaucracy. Go4Give
                  strives to eliminate the distance between donors and
                  beneficiaries by creating a platform that fosters human
                  connection, trust, and transparency
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How We Work */}
   <div className="rounded-4 p-4 p-lg-5 shadow-sm"
     style={{ background: "linear-gradient(135deg,#667eea 0%,#764ba2 100%)" }}>
  <h2 className="text-center fw-bold mb-4" style={{ color:"#fff" }}>
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
        <div className="p-3 rounded-3 h-100"
             style={{ background:"#ffffff26", color:"#fff", border:"1px solid #ffffff40" }}>
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