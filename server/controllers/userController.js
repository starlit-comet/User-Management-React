require('@dotenvx/dotenvx').config()
const jwt = require('jsonwebtoken')

const statusCodes = require('../utils/statuscodes.js')
const MESSAGES = require('../utils/responseMessages.js');

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

module.exports={loginController}