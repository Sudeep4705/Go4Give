const mongoose = require('mongoose');
const { type } = require('os');
const Schema  = mongoose.Schema;


const userSchema =  new Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    username:{
        type:String,
        required:true
        
    },
    password:{
       type:String,
       required:true
    },
    verifyOtp:{
        type:String,
        default:""
        
    },
    verifyOtpExpireAt:{
        type:Number,
        default:0
    },
    isAccountVerified:{
        type:Boolean,
        default:false
    },
    resetOtp:{
        type:String,
        default:""
    },
    resetOtpExpireAt:{
        type:Number,
        default:0
    },
    role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
    }

})

const User = mongoose.model("User",userSchema)
module.exports = User