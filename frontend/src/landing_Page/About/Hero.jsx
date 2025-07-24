function Hero() {
  return (
    <div
      style={{
        position: "relative",
        backgroundImage: `url("/images/hero.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "#fff",
        padding: "100px 20px 160px", // Bottom padding added
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)", // Slightly darker overlay
          zIndex: 1,
        }}
      ></div>

      {/* Content */}
      <div style={{ zIndex: 2, position: "relative" }}>
        <div className="row">
          <h1
            className="p-4"
            style={{
              background: "linear-gradient(90deg, #ffcc70, #c850c0)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "2.5rem",
              fontWeight: "bold",
            }}
          >
            Who We Are
          </h1>
          <div className="col-7">
            <p style={{ fontSize: "15px", lineHeight: "2" }}>
              Go4Give is more than just a charity platform it’s a digital
              bridge between empathy and action. Founded with the vision of
              humanizing donation and volunteerism, Go4Give empowers individuals
              to directly support orphans, senior citizens in need, and
              underserved communities through structured, transparent campaigns.
              <br />
              <br />
              
              We believe that everyone deserves dignity, love, and opportunity
              regardless of their background or circumstance. That’s why we’ve
              built an easy-to-use platform where donors can contribute in the
              form of funds, essential goods, education, healthcare, and even
              sponsor adoptions for orphans.
            </p>
          </div>
          <div className="col-4"></div>
        </div>

        <div className="row mt-5">
          <div className="col-4"></div>
          <div className="col-8">
            <h1
              className="text-center mb-4"
              style={{
                background: "linear-gradient(to right, #ff9966, #ff5e62)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: "2.5rem",
                fontWeight: "bold",
                marginLeft: "10rem",
              }}
            >
              What Makes Us Different?
            </h1>
            <p> Transparent Giving: Every donation is tracked with clear reporting so donors know exactly how their contributions are used.</p>
            <p> Real Impact: Whether it’s feeding an orphan, sponsoring education, or supporting elderly care, every action creates visible change.</p>
            <p> Personalized Donations: Choose specific causes or individuals to support — from orphan adoption to basic needs campaigns.</p>
            <p> Secure Platform: All transactions are encrypted and protected, ensuring safety for both donors and beneficiaries.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
