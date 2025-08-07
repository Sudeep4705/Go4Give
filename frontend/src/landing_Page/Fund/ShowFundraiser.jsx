import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ShowFundraiser.css"
function Fundraiser(){

  const [funds,setfunds] = useState([])

const handlechange = async()=>{
let res = await axios.get("http://localhost:8000/fundraiser/show")
setfunds(res.data)
}

  const navigate  =  useNavigate()
  const handsubmit =(fundid)=>{
navigate(`/fund/${fundid}`)
  }
useEffect(()=>{
handlechange()
},[])
    return(
        <>
<section className="env-hero">
  <div className="env-hero__bg" />
  <div className="container text-center">
    <h1 className="env-hero__title">
      Stand With Nature<br />
      <span className="env-hero__subtitle">Emergency Relief Fund</span>
    </h1>
    <p className="env-hero__lead">
      Rapid aid for flood, fire, cyclone and drought-affected communities.
      100 % transparent impact you can track in real time.
    </p>
    
  </div>
</section>

<style>{`
  .env-hero {
    position: relative;
    padding: 6rem 0;
    color: #fff;
    overflow: hidden;
  }

  /* animated SVG background */
  .env-hero__bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    background: linear-gradient(120deg, #0f2027, #203a43, #2c5364);
    background-size: 400% 400%;
    animation: gradientShift 12s ease infinite;
  }

  .env-hero__bg::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,\
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'>\
        <path d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.25' fill='%23ffffff'/>\
        <path d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' opacity='.5' fill='%23ffffff'/>\
        <path d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' fill='%23ffffff'/>\
      </svg>");
    background-size: cover;
    background-position: center bottom;
    opacity: 0.15;
    pointer-events: none;
  }

  .env-hero .container { position: relative; z-index: 1; }

  .env-hero__title {
    font-family: 'Inter', system-ui, sans-serif;
    font-weight: 800;
    font-size: clamp(2.2rem, 5vw, 3.5rem);
    letter-spacing: -0.02em;
    line-height: 1.1;
    margin-bottom: 0.5rem;
  }

  .env-hero__subtitle {
    font-weight: 300;
    color: #a3e635;
  }

  .env-hero__lead {
    max-width: 600px;
    margin: 1rem auto 2.5rem;
    font-size: 1.125rem;
    opacity: 0.9;
  }

  .env-hero__cta {
    background: #a3e635;
    color: #0f2027;
    border: none;
    font-weight: 700;
    padding: 0.9rem 2.5rem;
    border-radius: 50px;
    font-size: 1.1rem;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .env-hero__cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(163, 230, 53, 0.35);
  }

  @keyframes gradientShift {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`}</style>

 
<div className="container py-5">
  <div className="row g-4">
    {funds.map((fund) => {
      const raised = fund.currentamount || 0;
      const goal   = fund.goalamount   || 1;
      const percent = Math.min((raised / goal) * 100, 100).toFixed(0);

      return (
        <div className="col-lg-4 col-md-6" key={fund._id}>
          <div className="f-card">
            <div className="f-card__img">
              <img src={fund.image.url} alt={fund.cause} />
            </div>

            <div className="f-card__body">
              <h5 className="f-card__title">{fund.cause}</h5>
              <p className="f-card__desc">{fund.description}</p>

            

              

              <button className="f-card__btn" onClick={() => handsubmit(fund._id)}>Donate</button>
            </div>
          </div>
        </div>
      );
    })}
  </div>
</div>

</>
    )
}


export default Fundraiser;