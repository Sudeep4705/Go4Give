function Hero() {
  return (
    <div className="row">
      <div className="col">
        <div
          style={{
            position: "relative",
            backgroundImage: `url("/images/contact.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "0 20px",
            animation: "fadeIn 2s ease-in-out",
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
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              zIndex: 1,
            }}
          ></div>

          {/* Content */}
          <div style={{ zIndex: 2, maxWidth: "800px" }}>
            <h1
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: "700",
                marginBottom: "1rem",
              }}
            >
              Contact Us
            </h1>
            <p
              style={{
                fontSize: "1.2rem",
                lineHeight: "1.6",
                marginBottom: "2rem",
              }}
            >
              Whether you want to start a campaign, support a cause, or just say hello,
              we're here to help you make a difference.
            </p>
        
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
