const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    hashedPassword:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    mobile:{
        type:String
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    profileImage:{
        type:String
    }
})

module.exports= mongoose.model('User',UserSchema)