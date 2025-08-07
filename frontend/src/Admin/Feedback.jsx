import axios from "axios";
import { useEffect, useState } from "react";

// const Skeleton = ({ className }) => (
//   <div
//     className={className}
//     style={{
//       background: "linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%)",
//       backgroundSize: "200% 100%",
//       animation: "shimmer 1.2s infinite",
//       borderRadius: 12,
//     }}
//   />
// );

  const ratingColor = (r) => {
    if (r >= 4.5) return "#10b981"; // green
    if (r >= 3.5) return "#f59e0b"; // amber
    return "#ef4444"; // red
  };
function Feedback(){
    const [feedback,setfeedback] = useState()

    const handleChange=async()=>{
        let res = await axios.get("http://localhost:8000/reviews/show")
        setfeedback(res.data)
       
      
        
        
    }

    useEffect(()=>{
        handleChange()
    },[])
    return (
        <>
         {/* {feedback && feedback.map(item=>(
        <div key={item.id}>
             <p>{item.user.username}</p>
            <p>{item.comment}</p>
           
             <p className="starability-result" data-rating={item.rating}>
  {item.rating} stars
</p>
        </div>
       ))} */}

     
   <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% 0 }
          100% { background-position: 200% 0 }
        }
        .glass {
          background: rgba(255,255,255,0.18);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.25);
          box-shadow: 0 8px 32px rgba(0,0,0,0.08);
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .glass:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.12);
        }
      `}</style>

      <h3
        className="mb-4 text-center fw-bold"
        style={{
          background: "linear-gradient(135deg,#ff9a9e 0%,#fad0c4 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: "clamp(1.5rem,4vw,2.2rem)",
        }}
      >
        User Feedback
      </h3>

      {/* ---------- skeleton loader ---------- */}
      {/* {feedback === null && (
        <div className="row g-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="col-12 col-md-6 col-lg-3">
              <div className="glass rounded-4 p-4">
                <Skeleton className="mb-2" style={{ height: 20, width: "70%" }} />
                <Skeleton className="mb-3" style={{ height: 16, width: "50%" }} />
                <Skeleton style={{ height: 45, width: 45 }} />
              </div>
            </div>
          ))}
        </div>
      )} */}

      {/* ---------- card grid ---------- */}
      {feedback?.length ? (
        <div className="row g-4">
          {feedback.map((item, idx) => (
            <div
              key={idx}
              className="col-12 col-sm-6 col-lg-4 col-xl-3"
            >
              <div className="glass rounded-4 p-4 h-100">
                {/* user & orphan */}
                <div className="d-flex align-items-center mb-2">
                  <div
                    className="rounded-circle bg-light d-flex align-items-center justify-content-center fw-bold text-primary"
                    style={{ width: 44, height: 44, fontSize: 18 }}
                  >
                    {(item.user?.username || "?")[0].toUpperCase()}
                  </div>
                  <div className="ms-3">
                    <div className="fw-semibold">{item.user?.username}</div>
                    <small className="text-muted">
                      for <strong>{item.orphan?.name}</strong>
                    </small>
                  </div>
                </div>

                {/* comment */}
                <p className="mb-3 small text-secondary lh-sm">
                  {item.comment}
                </p>

                {/* rating badge */}
                <div
                  className="d-inline-block px-3 py-1 rounded-pill text-white fw-bold"
                  style={{
                    background: ratingColor(item.rating),
                    fontSize: 14,
                  }}
                >
                  {item.rating} ★
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : feedback?.length === 0 ? (
        <p className="text-center text-muted">No feedback yet.</p>
      ) : null}


        </>
      
    )
}


export default Feedback;