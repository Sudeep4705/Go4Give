const mongoose = require('mongoose');
const { ref } = require('process');


const Schema  = mongoose.Schema;

const orphanSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    regNo:{
        type:Number,
        required:true
    },
    fnd:{
        type:Date,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    city:{
       type:String,
        required:true 
    },
    state:{
        type:String,
        required:true 
    },
    image:{
        url:String,
        filename:String
    },
    info:{
        type:String,
        required:true

    },
    review:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    video:{
        url:String,
        filename:String
    }


})

const Listing  = mongoose.model("Listing",orphanSchema)
module.exports = Listing;