import { useState, useEffect } from "react";
import axios from "axios";
import "./Fundraisers.css"; // We'll define styles here
import Fundraiser from "./AddFundrasier";

function Fundraisers() {
  const [donors, setDonors] = useState([]);

const handleChange = async()=>{
    try {
      let res = await axios.get(`${import.meta.env.VITE_API_URL}/fundraiser/fundraiserlist`);
      setDonors(res.data);
    } catch (err) {
      console.log(err);
    }
  };

useEffect(()=>{
handleChange();
},[]);

const sendReceipt=async(donor) =>{
  try {
    let res = await axios.post(`${import.meta.env.VITE_API_URL}/fundraiser/sendreceipt`, {
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

const handledelete =async (id)=>{
  let res = await  axios.get(`${import.meta.env.VITE_API_URL}/fundraiser/delete/${id}`)
  alert(res.data.message)
}
  return (
    <div className="donar-container text-center">
      <h2 className="title">Fundraiser List</h2>
      <div className="table-wrapper">
        <table className="donors-table">
          <thead>
            <tr className="">
              <th>Donor Name</th>
              <th>Donation Amount</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Order ID</th>
              <th>Cause</th>
              <th>Receipt</th>
              <th>Remove</th>
          </tr>
          </thead>
          <tbody>
            {donors.map((t) => (
              <tr key={t._id}>
                <td>{t.donorName}</td>
                <td>₹{t.donationAmount}</td>
                <td>{t.email}</td>
                <td>{t.phone}</td>
                <td >{t.orderId}</td>
                <td >{t.Cause?.cause}</td>
                <td>
                  <button className="btn-receipt"
                   onClick={() => sendReceipt(t)}
                  >Send Receipt</button>
                </td>
                <td>
                  <button className="btn-delete"
                   onClick={() => handledelete(t._id)}
                  >Delete</button>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Fundraisers;
