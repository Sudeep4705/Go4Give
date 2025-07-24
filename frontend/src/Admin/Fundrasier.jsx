import axios from "axios";
import { useState } from "react";

function Fundraiser(){

    const [fundraiser,setfundraiser] = useState({
        cause:"",
        description:"",
        goalamount:"",
        // currentamount:"",
        image:""


    })

    const [image,setimage] = useState(null)
const  handleimage = (e)=>{
    setimage(e.target.files[0])
}
    const handleChange = (e)=>{
setfundraiser({...fundraiser,[e.target.name]:e.target.value})
    }

    const handleSubmit =async(e)=>{
e.preventDefault()
const form  = e.target

if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add("was-validated");
      return;
    }

     form.classList.add("was-validated");

     const formdata  =  new FormData(); // temp container
     formdata.append("cause",fundraiser.cause)
     formdata.append("description",fundraiser.description)
     formdata.append("goalamount",Number(fundraiser.goalamount))
    //  formdata.append("currentamount",fundraiser.currentamount)
     formdata.append("image",image)
try{
let res = await axios.post("http://localhost:8000/fundraiser",formdata,{
     headers: {
          "Content-Type": "multipart/form-data",
        },
})
alert(res.data.message)
}
catch(err){
    console.log(err);
    
}

    }

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
            {/* Orphanage Name */}
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
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
              Description
              </label>
             <textarea name="description" id="description" className="form-control" onChange={handleChange} value={fundraiser.description} ></textarea>
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
                required
              />
            </div>
           
         {/* <div className="mb-3">
              <label htmlFor="currentamount" className="form-label">
             Current Amount
              </label>
            <input
                type="text"
                id="currentamount"
                name="currentamount"
                value={fundraiser.currentamount}
                className="form-control"
                placeholder="Enter the Current Amount"
                  onChange={handleChange}
                required
              />
            </div> */}
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

export default Fundraiser;