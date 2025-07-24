import { useState } from "react";
import axios from 'axios'
import "./Support.css"
import { useEffect } from "react";
function Support(){
const [msg,setmsg] = useState([])

const handlechange = async()=>{
    let res  =  await axios.get("http://localhost:8000/query")
    setmsg(res.data)
    console.log(res.data);
    
}
useEffect(()=>{
    handlechange()
},[])

const updateStatus = async(id,newStatus)=>{
    await axios.put(`http://localhost:8000/query/${id}`,{status:newStatus})
    const res = await axios.get("http://localhost:8000/query")
    setmsg(res.data)
}

    return(
      <div className="support-table-wrapper">
  <h2>Support Tickets</h2>

  {msg.length === 0 ? (
    <p>No tickets yet.</p>
  ) : (
    <table className="support-table">
      <thead>
        <tr>
          <th>Email</th>
          <th>Name</th>
          <th>Subject</th>
          <th>Message</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {msg.map((t) => (
          <tr key={t._id}>
            <td>{t.email}</td>
            <td>{t.name}</td>
            <td>{t.subject}</td>
            <td style={{ maxWidth: 300, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {t.message}
            </td>
            <td>
              <span className={`status-badge ${t.status || "pending"}`}>
                {t.status || "pending"}
              </span>
            </td>
            <td>
              <button
                className="btn resolve"
                onClick={() => updateStatus(t._id, "resolved")}
                disabled={t.status === "resolved"}
              >
                Resolve
              </button>
              <button
                className="btn pending"
                onClick={() => updateStatus(t._id, "pending")}
                disabled={t.status === "pending"}
              >
                Pending
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>
    )
}

export default Support;