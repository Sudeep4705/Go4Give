const mongoose = require('mongoose');
const { type } = require('os');
const { ref } = require('process');
const Schema = mongoose.Schema;


const supportSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    status:{
        type:String,
        enum:['pending','resolved'],default:'pending'
    }
})


const Support = mongoose.model("Support",supportSchema);
module.exports= Support;