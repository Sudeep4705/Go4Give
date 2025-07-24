import { useState } from "react";
import "./Review.css"; 
import axios from "axios";
import { useParams } from "react-router-dom";



function Review({listingId}) {
  const [review, setReview] = useState({
    comment: "",
    rating:"",
  });

  const handlechange = (e)=>{
    setReview({...review,[e.target.name]:e.target.value})
   
    
  }

  const handlesubmit = async(e)=>{
     e.preventDefault();
      const payload = {
      ...review,
      rating: Number(review.rating),
    }
     try{
    let res = await axios.post(`http://localhost:8000/reviews/${listingId}`,payload,{
       withCredentials: true,
    })
    alert(res.data.message)
    setReview({comment:"",rating:""})
  }
  catch(err){
alert("please login to Add Review");

  }
    
  }


 
  return (
    <div className="review-section">
      <div className="review-card shadow">
        <h2 className="review-title">Leave a Review</h2>
        <form  autoComplete="off"  onSubmit={handlesubmit}>
          <label htmlFor="comment" className="form-label fw-bold fs-4">Comment </label>
          <textarea
            name="comment"
            id="comment"
            className="form-control mb-3"
            placeholder="Write your feedback here..."
            rows="4"
            value={review.comment}
            onChange={handlechange}
            required
          />

       <div className="mb-3 mt-4"> 
  <label htmlFor="rating" className="form-label fw-bold fs-4">Rating</label>
  <fieldset className="starability-slot">
  {/* optional “no rating” */}
  <input
    type="radio"
    name="rating"
    id="no-rate"
    value=""
    checked={review.rating === ""}
    onChange={handlechange}
    className="input-no-rate"
  />

  {/* 1 star (right-most) */}
  <input
    type="radio"
    id="rate1"
    name="rating"
    value="1"
    checked={review.rating === "1"}
    onChange={handlechange}
  />
  <label htmlFor="rate1" title="Terrible">1 star</label>

  {/* 2 stars */}
  <input
    type="radio"
    id="rate2"
    name="rating"
    value="2"
    checked={review.rating === "2"}
    onChange={handlechange}
  />
  <label htmlFor="rate2" title="Not good">2 stars</label>

  {/* 3 stars */}
  <input
    type="radio"
    id="rate3"
    name="rating"
    value="3"
    checked={review.rating === "3"}
    onChange={handlechange}
  />
  <label htmlFor="rate3" title="Average">3 stars</label>

  {/* 4 stars */}
  <input
    type="radio"
    id="rate4"
    name="rating"
    value="4"
    checked={review.rating === "4"}
    onChange={handlechange}
  />
  <label htmlFor="rate4" title="Very good">4 stars</label>

  {/* 5 stars (left-most) */}
  <input
    type="radio"
    id="rate5"
    name="rating"
    value="5"
    checked={review.rating === "5"}
    onChange={handlechange}
  />
  <label htmlFor="rate5" title="Amazing">5 stars</label>
</fieldset>
</div>



          <div className="text-center">
            <button type="submit" className="btn review-submit-btn">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Review;
