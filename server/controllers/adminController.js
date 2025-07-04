require('@dotenvx/dotenvx').config()
const jwt = require('jsonwebtoken')

const statusCodes = require('../utils/statuscodes.js')
const messages = require('../utils/responseMessages.js');
const adminSchema = require('../models/AdminDataScheme.js')
const userSchema = require('../models/UserDataScheme.js')

const loginController = async(req,res)=>{
    try {
        const{email,password} = req.body
        if(!email || !password || typeof(email)!=='string' || typeof(password)!== 'string') return res.status(statusCodes.BAD_REQUEST)
        console.log(email,password,name,'details from front')
        const token = jwt.sign({email},process.env.JWT_SECRET,{expiresIn:'1h'})
        return res.status(statusCodes.OK).json({message:messages.ACCOUNT_FOUND,token})
    } catch (error) {
        console.log(error)
    }
}





module.exports={loginController}