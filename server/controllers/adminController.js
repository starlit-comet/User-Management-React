require('@dotenvx/dotenvx').config()
const jwt = require('jsonwebtoken')

const statusCodes = require('../utils/statuscodes.js')
const messages = require('../utils/responseMessages.js');
const bcrypt = require('bcryptjs');
const loginSanitiser = require('../helpers/loginSanitizer.js')
const adminSchema = require('../models/AdminDataScheme.js')
const userSchema = require('../models/UserDataScheme.js');
const STATUS_CODES  = require('../utils/statuscodes.js');
const MESSAGES = require('../utils/responseMessages.js');

const loginController = async(req,res)=>{
    try {
        const{email,password} = req.body
        const validatedCredentials = loginSanitiser({email,password})
        if(!validatedCredentials.isValid){
            console.log(validatedCredentials)
            return res.status(STATUS_CODES.BAD_REQUEST).json({errors:validatedCredentials.errors})
        }
        const adminEmail = validatedCredentials.sanitizedData.email
        const adminData = await adminSchema.findOne({email:adminEmail})
        if(!adminData) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({messages:MESSAGES.EMAIL_NOT_FOUND})
        }
        const isPasswordValid = await bcrypt.compare(validatedCredentials.sanitizedData.password,adminData.hashedPassword)
        if(!isPasswordValid) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({message:MESSAGES.INVALID_PASSWORD})
        }
        console.log('admin logged in ')
        const token = jwt.sign({email},process.env.JWT_SECRET,{expiresIn:'1h'})
        console.log(adminData,'admin login data from mongo',adminData.mobile)
        return res.status(statusCodes.OK).json({message:messages.LOGIN_SUCCESS,token,adminDetails:{
            adminEmail,adminName:adminData.name,adminPhone:adminData.mobile
        }})
    } catch (error) {
        console.log(error)
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({error:MESSAGES.INTERNAL_SERVER_ERROR})
    }
}

const getUsersData=async(req,res)=>{
    try {

        const usersData = await userSchema.find({},'-hashedPassword')
        return res.status(200).json({usersData})
    } catch (error) {
        console.log(error)
    }
}
const verifyJwtToken = async (req,res)=>{
    // console.log(req.headers)
    const token = req.headers.authorization?.split(' ')[1]
    if(!token) return res.status(STATUS_CODES.UNAUTHORIZED)
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        return res.status(STATUS_CODES.OK).json({Admin:decoded})
    } catch (error) {
        console.log(error)
        return res.status(STATUS_CODES.FORBIDDEN).json({message:"Invalid Token"})
    }
}

const deleteUser = async(req,res)=>{
    try {
        console.log(req,'req in admin delete user')
    } catch (error) {
        
    }
}

module.exports={loginController,getUsersData,verifyJwtToken,deleteUser}