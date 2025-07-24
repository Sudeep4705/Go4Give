// function LeftSection() {
//   return (
//     <div className="row">
//       <div className="col-6">
//         <img src="images/left.jpg" alt="" style={{width:"100%", height:"500px"}}/>
//       </div>
//       <div className="col-6 p-5">
//         <h2 style={{color:"limegreen", fontWeight:"700"}} className="mb-3">OUR VISION</h2>
//         <p style={{ fontSize: "1.1rem", lineHeight: "1.5", color: "#333" }}>
//           At <strong>Go4Give</strong>, we envision a compassionate digital space where <strong>every orphaned child</strong> and <strong>neglected elder</strong> finds support, dignity, and a chance at a better life. <br /><br />
//           Our mission is to foster a transparent and human-centered ecosystem that connects donors, institutions, and volunteers to transform lives meaningfully. 
//           We strive to make generosity seamless and purposeful, turning every contribution into a powerful story of change.<br /><br />
//           Together, we aim to <em>bridge hearts, heal lives, and build a more caring world</em>—one donation at a time.
//         </p>
//          <a href="#" style={{ textDecoration: "none", color: "#0a58ca", fontWeight: "600", display: "inline-block", marginTop: "10px" }}>
//           Learn More &nbsp;<i className="fa-solid fa-arrow-right"></i>
//         </a>
//       </div>
//     </div>
//   );
// }


// export default LeftSection;

import { useRef, useEffect } from "react";

function LeftSection() {
  const cardRef = useRef(null);

  // gentle fade-up on load
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.opacity = 0;
    el.style.transform = "translateY(25px)";
    el.style.transition = "opacity .8s ease, transform .8s ease";
    setTimeout(() => {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }, 100);
  }, []);

  const palette = {
    accent: "#00c4b4",        // teal
    accentGlow: "rgba(0,196,180,0.35)",
    bgGlass: "rgba(255,255,255,0.65)",
    text: "#222",
    link: "#007bff",
  };

  return (
    <div className="row g-0 align-items-center">
      {/* Left image */}
      <div className="col-lg-6">
        <img
          src="images/left.jpg"
          alt="Our vision"
          style={{
            width: "100%",
            height: "clamp(320px, 60vh, 520px)",
            objectFit: "cover",
            borderRadius: "0 24px 24px 0",
            boxShadow: `8px 0 20px ${palette.accentGlow}`,
          }}
        />
      </div>

      {/* Right text block */}
      <div className="col-lg-6 px-4 px-lg-5 py-5">
        <div
          ref={cardRef}
          style={{
            backgroundColor: palette.bgGlass,
            backdropFilter: "blur(10px)",
            borderRadius: 20,
            padding: "clamp(1.5rem, 4vw, 2.8rem)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
            border: "1px solid rgba(255,255,255,0.25)",
          }}
        >
          <h2
            style={{
              color: palette.accent,
              fontWeight: 800,
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              marginBottom: "1rem",
            }}
          >
            OUR VISION
          </h2>

          <p
            style={{
              fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
              lineHeight: 1.75,
              color: palette.text,
            }}
          >
            At <strong>Go4Give</strong>, we envision a compassionate digital
            space where <strong>every orphaned child</strong> and{" "}
            <strong>neglected elder</strong> finds support, dignity, and a chance
            at a better life.
            <br />
            <br />
            Our mission is to foster a transparent, human-centered ecosystem
            connecting donors, institutions, and volunteers to transform lives
            meaningfully.
            <br />
            <br />
            Together, we aim to{" "}
            <em>
              bridge hearts, heal lives, and build a more caring world
            </em>{" "}
            — one donation at a time.
          </p>

          <a
            href="/blog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              marginTop: "1.2rem",
              fontWeight: 600,
              color: palette.link,
              textDecoration: "none",
              fontSize: "1.05rem",  
              transition: "color .3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.color = palette.accent)}
            onMouseLeave={(e) => (e.target.style.color = palette.link)}
          >
            Learn More
            <i
              className="fa-solid fa-arrow-right"
              style={{
                marginLeft: 6,
                transition: "transform .3s ease",
              }}
            />
            {/* tiny inline script for hover animation */}
            <style>{`
              a:hover .fa-arrow-right {
                transform: translateX(4px);
              }
            `}</style>
          </a>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;