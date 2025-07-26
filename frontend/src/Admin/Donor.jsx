import { useState, useEffect } from "react";
import axios from "axios";
import "./Donar.css"; // We'll define styles here

function Donar() {
  const [donors, setDonors] = useState([]);

  const handleChange = async () => {
    try {
      let res = await axios.get("http://localhost:8000/donorslist");
      setDonors(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleChange();
  }, []);


  const sendReceipt = async (donor) => {
  try {
    let res = await axios.post("http://localhost:8000/sendreceipt", {
      donorName: donor.donorName,
      email: donor.email,
      donationAmount: donor.donationAmount,
      orderId: donor.orderId,
    });

    if (res.data.success) {
      alert("Receipt sent to " + donor.email);
    } else {
      alert("Failed to send receipt");
    }
  } catch (err) {
    console.error(err);
  }
};


  return (
    <div className="donar-container">
      <h2 className="title">Donors List</h2>
      <div className="table-wrapper">
        <table className="donors-table">
          <thead>
            <tr className="text-center">
              <th>Donor Name</th>
              <th>Donation Amount</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Order ID</th>
              <th>Receipt</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {donors.map((t) => (
              <tr key={t._id}>
                <td>{t.donorName}</td>
                <td>₹{t.donationAmount}</td>
                <td>{t.email}</td>
                <td>{t.phone}</td>
                <td >{t.orderId}</td>
                <td>
                  <button className="btn-receipt"
                   onClick={() => sendReceipt(t)}
                  >Send Receipt</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Donar;
