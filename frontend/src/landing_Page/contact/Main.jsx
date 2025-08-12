import { useState } from "react";
import axios from "axios";
 
import "./Main.css";                            

function Main() {
  const [msg, setMsg] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) =>
    setMsg({ ...msg, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5173/query/add", msg, {
        withCredentials: true,
      });
      alert(res.data.message);
      setMsg({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      alert("Please Login");
    }
  };

  return (
    <div className="contact-wrapper">
      <div className="contact-card">
        {/* Header */}
        <div className="contact-header">
          <h2>Reach Us</h2>
          <p>
            If you’d like to get in touch questions, concerns, suggestions, or
            just to say “hello”we’d love to hear from you!
          </p>
        </div>

        {/* Form */}
        <form className="row g-4" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control form-control-lg"
              name="name"
              placeholder="Your full name"
              value={msg.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control form-control-lg"
              name="email"
              placeholder="you@gmail.com"
              value={msg.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12">
            <label className="form-label">Subject</label>
            <input
              type="text"
              className="form-control form-control-lg"
              name="subject"
              placeholder="Subject"
              value={msg.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12">
            <label className="form-label">Message</label>
            <textarea
              className="form-control form-control-lg"
              rows={5}
              name="message"
              placeholder="Write your message here…"
              value={msg.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="col-12 text-center">
            <button type="submit" className="btn btn-gradient btn-lg">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Main;