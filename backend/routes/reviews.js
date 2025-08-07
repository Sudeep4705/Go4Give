const express = require("express");
const router = express.Router()
const Review = require("../model/orphanage/review");
const authenticateUser = require("../middleware/auth");

// review
router.post("/:listingId",authenticateUser,async (req, res) => {
  const { comment, rating } = req.body;
  try {
    const review = new Review({
      comment,
      rating,
      user: req.user.id,
      orphan: req.params.listingId,
    });
    await review.save();
    res.status(201).json({ message: "review added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Review not added" });
  }
});

// feedback
router.get("/show", async (req, res) => {
  let feedback = await Review.find({}).populate("user").populate("orphan");
  res.json(feedback);
});


module.exports = router; 