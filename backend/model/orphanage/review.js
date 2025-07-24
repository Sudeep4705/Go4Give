const mongoose = require("mongoose");
const { type } = require("os");
const Schema  =  mongoose.Schema;
const reviewSchema = new Schema({
  comment: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  user: {
    type:Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  orphan:{
    type:Schema.Types.ObjectId,
    ref:"Listing"
  }
});

module.exports = mongoose.model("Review", reviewSchema);
