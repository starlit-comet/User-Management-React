require('@dotenvx/dotenvx').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const validateAndSanitize =require('../helpers/signupSanitizer.js').validateAndSanitize
const statusCodes = require('../utils/statuscodes.js')
const MESSAGES = require('../utils/responseMessages.js');
const UserSchema = require('../models/UserDataScheme.js')
const loginController = async(req,res)=>{
    try {
        console.log(req.body)
        const{email,password,name} = req.body

        console.log(email,password,name,'details from front')
        const token = jwt.sign({email},process.env.JWT_SECRET,{expiresIn:'1h'})
        return res.status(statusCodes.OK).json({message:MESSAGES.ACCOUNT_FOUND,token})
    } catch (error) {
        console.log(error)
    }
}

const signupController = async(req,res)=>{
try {
    const {name,email,phone,password,confirmPassword} = req.body
    const validatedResults = validateAndSanitize({name,email,phone,password,confirmPassword})
    console.log(validatedResults)
    if(!validatedResults.isValid){
        return res.status(statusCodes.BAD_REQUEST).json({errors:validatedResults.errors})
    }
    const isEmailAlreadyExistes = await UserSchema.find({email})
    console.log(isEmailAlreadyExistes)
    if(isEmailAlreadyExistes.length!==0) return res.status(statusCodes.BAD_REQUEST).json({message:MESSAGES.USER_ALREADY_EXISTS})
    const hashedPassword = await bcrypt.hash(validatedResults.sanitizedData.password,10)
    const newUser = new UserSchema ({
        email:validatedResults.sanitizedData.email,
        hashedPassword,
        name:validatedResults.sanitizedData.email,
        phone:validatedResults.sanitizedData.phone
    })
    await newUser.save()
    const emailForJwt = newUser.email
    const newToken = jwt.sign({emailForJwt},process.env.JWT_SECRET,{expiresIn:'1h'})

    return res.status(statusCodes.OK).json({token:newToken,userData:newUser})
} catch (error) {
    console.log(error)
}
}

module.exports={loginController,signupController}