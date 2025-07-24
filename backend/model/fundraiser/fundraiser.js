
const mongoose = require('mongoose');

const Schema  = mongoose.Schema;


const fundraiserSchema = new Schema({
    cause:{
    type:String,
    required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        url:String,
        filename:String
    },
    goalamount:{
        type:Number,
        required:true
    },
    currentamount:{
        type:Number,
       
        default:0
    }
})

const Fundraiser = mongoose.model("Fundraiser",fundraiserSchema)

module.exports = Fundraiser; 