const mongoose = require('mongoose')

const AdminSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
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
})

module.exports= mongoose.model('Admin',AdminSchema)