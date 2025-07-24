import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Orphanage() {
  const [orphanage, setOrphanage] = useState({
    name: "",
    regNo: "",
    fnd: "",
    type: "",
    address: "",
    info:"",
    city: "",
    state: "",
    image: "",
    video:""
  });

  const [image, setimage] = useState(null);
  const [video, setvideo] = useState(null);

  const handleimage = (e) => {
    setimage(e.target.files[0]);
  };
  const handlevideo = (e) => {
    setvideo(e.target.files[0]);
  };
  const handleChange = (e) => {
    setOrphanage({ ...orphanage, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add("was-validated");
      return;
    }

    form.classList.add("was-validated");

    const formdata = new FormData();
    formdata.append("name", orphanage.name);
    formdata.append("regNo", orphanage.regNo);
    formdata.append("fnd", orphanage.fnd);
    formdata.append("type", orphanage.type);
    formdata.append("address", orphanage.address);
    formdata.append("info", orphanage.info);
    formdata.append("city", orphanage.city);
    formdata.append("state", orphanage.state);
    formdata.append("image", image);
    formdata.append("video", video);

    try {
      await axios.post("http://localhost:8000/add", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Orphanage added");
      navigate("/index");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container mt-5 mb-5">
        <div
          className="card shadow-lg p-4"
          style={{
            background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
            borderRadius: "12px",
          }}
        >
          <h2 className="text-center mb-4">Add Orphanage</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Orphanage Name */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Orphanage Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={orphanage.name}
                className="form-control"
                placeholder="Enter the orphanage name"
                onChange={handleChange}
                required
              />
            </div>

            {/* Registration Number */}
            <div className="mb-3">
              <label htmlFor="regNo" className="form-label">
                Registration Number
              </label>
              <input
                type="text"
                id="regNo"
                name="regNo"
                value={orphanage.regNo}
                className="form-control"
                placeholder="Enter the registration number"
                onChange={handleChange}
                required
              />
            </div>

            {/* Image */}
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                className="form-control"
                onChange={handleimage}
                required
              />
            </div>
            {/* video */}
            <div className="mb-3">
              <label htmlFor="video" className="form-label">
                Video
              </label>
              <input
                type="file"
                id="video"
                name="video"
                className="form-control"
                onChange={handlevideo}
                required
                accept="video/*"
              />
            </div>

            {/* Founded Date */}
            <div className="mb-3">
              <label htmlFor="fnd" className="form-label">
                Founded Date
              </label>
              <input
                type="date"
                id="fnd"
                name="fnd"
                value={orphanage.fnd}
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>

            {/* Orphanage Type */}
            <div className="mb-3">
              <label htmlFor="type" className="form-label">
                Type of Orphanage
              </label>
              <select
                id="type"
                name="type"
                value={orphanage.type}
                className="form-select"
                onChange={handleChange}
                required
              >
                <option value="">-- Select --</option>
                <option value="government">Government</option>
                <option value="private">Private</option>
                <option value="ngo">NGO</option>
              </select>
            </div>

            {/* Address */}
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={orphanage.address}
                className="form-control"
                placeholder="Enter full address"
                rows="3"
                onChange={handleChange}
                required
              ></textarea>
            </div>
            {/* info */}
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Additional Information
              </label>
              <textarea
                id="info"
                name="info"
                value={orphanage.info}
                className="form-control"
                placeholder="Enter the additional information"
                rows="3"
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* City */}
            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={orphanage.city}
                className="form-control"
                placeholder="Enter the city"
                onChange={handleChange}
                required
              />
            </div>

            {/* State */}
            <div className="mb-4">
              <label htmlFor="state" className="form-label">
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={orphanage.state}
                className="form-control"
                placeholder="Enter the state"
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button type="submit" className="btn btn-primary px-4">
                Add Orphanage
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Orphanage;
