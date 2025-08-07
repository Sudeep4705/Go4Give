import { FaEye, FaHeart, FaHandHoldingHeart, FaLock } from "react-icons/fa";

function Hero() {
  return (
    <section
      style={{
        position: "relative",
        backgroundImage: `url("/images/hero.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        fontFamily: "Poppins, sans-serif",
        display: "flex",
        alignItems: "center",
        
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.65)",
          zIndex: 1,
        }}
      ></div>

      {/* Content Wrapper */}
      <div
        className="container"
        style={{
          zIndex: 2,
          color: "#fff",
        }}
      >
        {/* Who We Are */}
        <div className="row align-items-center mb-5">
          <div className="col-lg-7">
            <h1
              style={{
                background: "linear-gradient(90deg, #ffcc70, #c850c0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: "3rem",
                fontWeight: "bold",
                marginBottom: "1rem",
                marginTop:"5rem"
              }}
            >
              Who We Are
            </h1>
            <div
              style={{
                background: "rgba(255,255,255,0.1)",
                padding: "1.5rem",
                borderRadius: "1rem",
                backdropFilter: "blur(8px)",
              }}
            >
              <p style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
                Go4Give is more than just a charity platform  it’s a digital
                bridge between empathy and action. We empower individuals to
                directly support orphans, senior citizens, and underserved
                communities through transparent, impactful campaigns.
              </p>
              <p style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
                Our mission is simple: give dignity, love, and opportunity to
                everyone, regardless of background. Contributions can be in the
                form of funds, essential goods, education, healthcare, or even
                adoption sponsorships.
              </p>
            </div>
          </div>
        </div>

        {/* What Makes Us Different */}
        <div className="row">
          <div className="col-12">
            <h1
              className="text-center mb-5"
              style={{
                background: "linear-gradient(to right, #ff9966, #ff5e62)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: "3rem",
                fontWeight: "bold",
              }}
            >
              What Makes Us Different?
            </h1>
          </div>

          {[
            {
              icon: <FaEye size={30} />,
              title: "Transparent Giving",
              text: "Every donation is tracked with clear reporting so donors know exactly where their contributions go.",
            },
            {
              icon: <FaHeart size={30} />,
              title: "Real Impact",
              text: "From feeding orphans to sponsoring education or elderly care, every action creates visible change.",
            },
            {
              icon: <FaHandHoldingHeart size={30} />,
              title: "Personalized Donations",
              text: "Choose specific causes or individuals to support  from orphan adoption to basic needs campaigns.",
            },
            {
              icon: <FaLock size={30} />,
              title: "Secure Platform",
              text: "All transactions are encrypted and protected for the safety of both donors and beneficiaries.",
            },
          ].map((item, idx) => (
            <div key={idx} className="col-md-6 col-lg-3 mb-4">
              <div
                style={{
                  background: "rgba(255,255,255,0.1)",
                  padding: "1.5rem",
                  borderRadius: "1rem",
                  backdropFilter: "blur(8px)",
                  textAlign: "center",
                  height: "100%",
                }}
              >
                <div style={{ color: "#ffcc70", marginBottom: "1rem" }}>
                  {item.icon}
                </div>
                <h5 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                  {item.title}
                </h5>
                <p style={{ fontSize: "0.95rem", opacity: 0.9 }}>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
