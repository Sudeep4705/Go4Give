import axios from "axios";
import { useState } from "react";

function AddFundraiser(){

    const [fundraiser,setfundraiser] = useState({
        cause:"",
        description:"",
        goalamount:"",
        image:""
    })

    const [image,setimage] = useState(null)
    
    const handleimage = (e)=>{
        const file = e.target.files[0];
        console.log("Selected file:", file); // Debug log
        setimage(file);
    }
    
    const handleChange = (e)=>{
        setfundraiser({...fundraiser,[e.target.name]:e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        if (!form.checkValidity()) {
            e.stopPropagation();
            form.classList.add("was-validated");
            return;
        }

        form.classList.add("was-validated");

        // Debug: Check if image is selected
        if (!image) {
            alert("Please select an image file");
            return;
        }

        const formdata = new FormData();
        formdata.append("cause", fundraiser.cause);
        formdata.append("description", fundraiser.description);
        formdata.append("goalamount", Number(fundraiser.goalamount));
        formdata.append("image", image);

       

        try {
            let res = await axios.post("http://localhost:8000/fundraiser/add", formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("Success response:", res.data);
            alert(res.data.message);
            
            // Reset form on success
            setfundraiser({
                cause:"",
                description:"",
                goalamount:"",
                image:""
            });
            setimage(null);
            form.reset();
            
        } catch (err) {
            console.error("Add Fundraiser Error:", err.response?.data || err.message);
            console.error("Full error object:", err);
            alert(`Failed to add fundraiser: ${err.response?.data?.message || err.message}`);
        }
    };

    return(
       <>
       <div className="container mt-5 mb-5">
        <div
          className="card p-4"
          style={{
            background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
            borderRadius: "12px",
          }}
        >
          <h2 className="text-center mb-4">Add Fundraiser</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Cause */}
            <div className="mb-3">
              <label htmlFor="cause" className="form-label">
                Cause
              </label>
              <input
                type="text"
                id="cause"
                name="cause"
                value={fundraiser.cause}
                className="form-control"
                placeholder="Enter the Cause"
                onChange={handleChange}
                required
              />
            </div>
            
            {/* Description */}
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea 
                name="description" 
                id="description" 
                className="form-control" 
                onChange={handleChange} 
                value={fundraiser.description}
                rows="4"
                required
              ></textarea>
            </div>

            {/* Goal Amount */}
            <div className="mb-3">
              <label htmlFor="goalamount" className="form-label">
                Goal Amount
              </label>
              <input
                type="number"
                id="goalamount"
                name="goalamount"
                value={fundraiser.goalamount}
                className="form-control"
                placeholder="Enter the Goal Amount"
                onChange={handleChange}
                min="1"
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
                accept="image/*"
                required
              />
              {image && (
                <small className="text-muted">
                  Selected: {image.name} ({(image.size / 1024 / 1024).toFixed(2)} MB)
                </small>
              )}
            </div>
     
            <div className="text-center">
              <button type="submit" className="btn btn-primary px-4">
                Add Fundraiser
              </button>
            </div>
          </form>
        </div>
      </div>
       </>
    )
}

export default AddFundraiser;