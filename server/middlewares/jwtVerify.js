const jwt = require('jsonwebtoken')
const STATUS_CODES = require('../utils/statuscodes')
const RES_MESSAGES = require('../utils/responseMessages')
const MESSAGES = require('../utils/responseMessages')

const verifyToken = (req,res,next)=>{
    try {
        req.jwtResultValid=false
        const reqToken = req.headers?.authorization.split(' ')[1]
        
        console.log(reqToken, 'token in mdd')
        const result = jwt.verify(reqToken,process.env.JWT_SECRET, (err,decoded)=>{
            if(err){
                if(err.name==="TokenExpiredError"){
                    return res.status(STATUS_CODES.UNAUTHORIZED).json({message:MESSAGES.JWT_EXPIRED})
                }
                return res.status(STATUS_CODES.FORBIDDEN).json({message:MESSAGES.INVALID_JWT_TOKEN})
            }
        })
        req.jwtResult = result
        req.jwtResultValid=true
        next()
    } catch (error) {
        // console.log(error)
        return res.status(STATUS_CODES.UNAUTHORIZED).json({message:RES_MESSAGES.USER_NOT_AUTHENTICATED,data:"jwt middle ware",error})
    }
}

module.exports={verifyToken}