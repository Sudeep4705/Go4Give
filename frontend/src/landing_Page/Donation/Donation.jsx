import { useState } from "react";
import "./Donation.css";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import axios from "axios"
import { useParams } from "react-router-dom";

function Donation() {
 const { id } = useParams();
  console.log("Donation ID:", id);
  const [donation, setDonation] = useState({
    donorName: "",
    donationAmount: "",
    email: "",
    phone: "",
  });
  
const [razorpay,setrazorpay] = useState({
    razorpay_payment_id:"",
    razorpay_order_id:"",
    razorpay_signature:""
  })

  const handleChange=(e)=>{
    setDonation({...donation,[e.target.name]:e.target.value})
  }

  

const handlesubmit = async (e) => {
  e.preventDefault();
  try {
    let res = await axios.post(`http://localhost:8000/donation/donate/${id}`, donation,{
       withCredentials: true
    });

    if (res.data.success) {
      // Save orderId and key for checkout
      setrazorpay(prev => ({
        ...prev,
        razorpay_order_id: res.data.orderId
      }));

      // Open Razorpay checkout here using orderId & key
      openRazorpay(res.data.orderId, res.data.key, donation.donationAmount);
    }
  } catch (err) {

    
    alert("Please login");
    console.log(err);
    
  }
};


const openRazorpay = (orderId, key, amount) => {
  const options = {
    key: key, // Razorpay Key ID from backend
    amount: amount * 100, // in paise
    currency: "INR",
    name: "Your Charity Name",
    description: "Donation Payment",
    order_id: orderId, // orderId from backend
  
  
    handler: function (response) {
      // Razorpay sends back payment details here
      setrazorpay({
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature
      });

      // Send these details to your backend for verification
      axios.post("http://localhost:8000/donation/verifypayment", {
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature
      },{
        withCredentials: true
      })
      .then(res => {
        if (res.data.success) {
          alert("Payment Successful!");
          setDonation({donorName: "",
    donationAmount: "",
    email: "",
    phone: "",})
        } else {
          alert("Payment verification failed!");
        }
      })
      .catch(err => console.error(err));
    },
    theme: {
      color: "#3399cc"
    }
  };

  const rzp1 = new window.Razorpay(options);
  rzp1.open();
};

  

  return (
    <>
      {/* Hero Section */}
      <section
        className="py-5 mb-5 text-center"
        style={{
          background: "linear-gradient(135deg, #74ebd5 0%, #acb6e5 100%)",
        }}
      >
        <div className="container">
          <h1 className="display-4 fw-bold text-white mb-3">
            Empowering Change
          </h1>
          <p className="lead text-white-50 mb-0">
            Discover how your donations transform lives and create lasting
            impact.
          </p>
        </div>
      </section>

      {/* Donation Form Section */}
      <div className="container mb-5">
        <div className="row align-items-center shadow-lg rounded-4 overflow-hidden">
          {/* Form Side */}
          <div className="col-lg-5 bg-white p-4">
            <h2 className="mb-4 text-primary d-flex align-items-center">
              Donation Form <VolunteerActivismIcon className="ms-2" />
            </h2>
            <form className="donation-form" onSubmit={handlesubmit}>
              <div className="form-group mb-3">
                <label htmlFor="donorName" className="form-label fw-semibold">
                  Donor Name
                </label>
                <input
                  type="text"
                  id="donorName"
                  name="donorName"
                  value={donation.donorName}
                  onChange={handleChange}
                  className="form-control rounded-pill shadow-sm"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label
                  htmlFor="donationAmount"
                  className="form-label fw-semibold"
                >
                  Donation Amount ($)
                </label>
                <input
                  type="number"
                  id="donationAmount"
                  name="donationAmount"
                  value={donation.donationAmount}
                  onChange={handleChange}
                  className="form-control rounded-pill shadow-sm"
                  placeholder="Enter amount"
                  step="0.01"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="email" className="form-label fw-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={donation.email}
                  onChange={handleChange}
                  className="form-control rounded-pill shadow-sm"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="phone" className="form-label fw-semibold">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={donation.phone}
                  onChange={handleChange}
                  className="form-control rounded-pill shadow-sm"
                  placeholder="+1 123-456-7890"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100 py-2 rounded-pill shadow-sm"
              >
                Donate Now
              </button>
            </form>
          </div>

          {/* Image Side */}
          <div className="col-lg-7 p-0">
            <img
              src="/images/form.jpg"
              alt="donation"
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Donation;
