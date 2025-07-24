const mongoose = require('mongoose');

const Schema  = mongoose.Schema;


const AdminSchema =  new Schema({
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

const Admin = mongoose.model("Admin",AdminSchema)
module.exports = Admin