const mongoose = require('mongoose');



const Schema = mongoose.Schema;

const FundsSchema = new Schema({
    donorName: {
        type: String,
        required: true
    },
    donationAmount: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String, 
        required: true
    },
    orderId: {
        type: String,
    },
    paymentId: {
        type: String
    },
    status: {
        type: String,
        enum: ["pending", "Success", "Failed"],
        default: "pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    Cause:{
        type:Schema.Types.ObjectId,
        ref:"Fundraiser"
        
    }
});

const Funds = mongoose.model("Funds", FundsSchema);

module.exports = Funds;
