const mongoose = require('mongoose')
const { type } = require('os')

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

export default mongoose.model('Admin',AdminSchema)