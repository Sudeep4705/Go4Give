const razorpay = require("razorpay");

const instance  = new razorpay({
    key_id:process.env.RAZORPAY_API_ID,
    key_secret:process.env.RAZORPAY_API_SECRET,
})

module.exports = instance

