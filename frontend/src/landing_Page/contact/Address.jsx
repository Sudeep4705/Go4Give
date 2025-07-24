import "./Address.css"
function Address() {
  return (
    <section className="address-section">
      <div className="container-fluid">
        <div className="row g-4 justify-content-center">
          {/* --- Visit Us --- */}
          <div className="col-lg-4 col-md-6">
            <div className="info-card">
              <img src="/images/location.jpg" alt="Office" />
              <div className="info-content">
                <h5>Visit Us</h5>
                <p>
                  Go4Give Office, 123 Kindness Lane,
                  <br /> Bengaluru, India 560001
                </p>
                <small>Mon–Fri: 9 am – 6 pm</small>
              </div>
            </div>
          </div>

          {/* --- Email Us --- */}
          <div className="col-lg-4 col-md-6">
            <div className="info-card">
              <img src="/images/email.jpg" alt="Email" />
              <div className="info-content">
                <h5>Email Us</h5>
                <p>support@go4give.org</p>
                <small>We’ll reply within 24 hours</small>
              </div>
            </div>
          </div>

          {/* --- Call Us --- */}
          <div className="col-lg-4 col-md-6">
            <div className="info-card">
              <img src="/images/phone.jpg" alt="Phone" />
              <div className="info-content">
                <h5>Call Us</h5>
                <p>+91-98765-43210</p>
                <small>24/7 Support Available</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Address;