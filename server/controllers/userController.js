require("@dotenvx/dotenvx").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validateAndSanitize =
  require("../helpers/signupSanitizer.js").validateAndSanitize;
const validateAndSanitizeLoginDetails = require('../helpers/loginSanitizer.js')
const STATUSCODES = require("../utils/statuscodes.js");
const MESSAGES = require("../utils/responseMessages.js");
const UserSchema = require("../models/UserDataScheme.js");
// const multer = require('multer')
const uploadToCloudinary = require('../helpers/uploadToCloudinary.js');
const { STATUS_CODES } = require("http");


const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const validatedData = validateAndSanitizeLoginDetails({email,password})
    console.log(validatedData)
    if(!validatedData.isValid){
      const errors=validatedData.errors
      return res.status(STATUSCODES.NOT_ACCEPTABLE).json({errors})
    }
    const user = await UserSchema.findOne({email:email,isBlocked:false})
    if(!user) return res.status(STATUSCODES.NOT_FOUND).json({message:MESSAGES.USER_NOT_FOUND})
    const isPasswordValid= await bcrypt.compare(password,user.hashedPassword)
    if(!isPasswordValid) return res.status(STATUSCODES.UNAUTHORIZED).json({message:MESSAGES.INVALID_PASSWORD})
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TOKEN_EXPIRE_IN_1H ,
    });
    const userDetails={
        name:user.name,
        email:user.email,
        phone:user?.mobile,
        pic:user?.profileImage,
        isBlocked:user.isBlocked,
    }
    return res
      .status(STATUSCODES.OK)
      .json({ message: MESSAGES.ACCOUNT_FOUND, token,userDetails });

  } catch (error) {
    console.log(error);
    return res.status(STATUSCODES.INTERNAL_SERVER_ERROR).json({message:MESSAGES.INTERNAL_SERVER_ERROR})
  }
};

const signupController = async (req, res) => {
  try {
    console.log(req.body)
    const { name, email, phone, password, confirmPassword } = req.body.current;
    const validatedResults = validateAndSanitize({
      name,
      email,
      phone,
      password,
      confirmPassword,
    });
    // console.log(validatedResults);
    if (!validatedResults.isValid) {
      return res
        .status(STATUSCODES.BAD_REQUEST)
        .json({ errors: validatedResults.errors });
    }
    const isEmailAlreadyExistes = await UserSchema.find({ email });
    console.log(isEmailAlreadyExistes);
    if (isEmailAlreadyExistes.length !== 0)
      return res
        .status(STATUSCODES.BAD_REQUEST)
        .json({ message: MESSAGES.USER_ALREADY_EXISTS });
    const hashedPassword = await bcrypt.hash(
      validatedResults.sanitizedData.password,
      10
    );
    const newUser = new UserSchema({
      email: validatedResults.sanitizedData.email,
      hashedPassword,
      name: validatedResults.sanitizedData.name,
      phone: validatedResults.sanitizedData.phone,
    });
    await newUser.save();
    const emailForJwt = newUser.email;
    const newToken = jwt.sign({ emailForJwt }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TOKEN_EXPIRE_IN_1H ,
    });

    return res
      .status(STATUSCODES.OK)
      .json({ token: newToken, userData: newUser });
  } catch (error) {
    console.log(error);
    return res.status(STATUSCODES.INTERNAL_SERVER_ERROR).json({message:MESSAGES.INTERNAL_SERVER_ERROR})
  }
};

const imageUpload = async(req,res)=>{
  // console.log(req.headers,'req object')
    try {
      console.log(req.jwtResult,'result from img upload fn')
        const result = await uploadToCloudinary(req.file,process.env.CLOUDINARY_USER_FOLDER_PATH);
        const userData = await UserSchema.findOne({email:req.jwtResult.email},'-hashedPassword')
        userData.profileImage=result.secure_url
        await userData.save()
        res.json({url:result.secure_url,userData}) 
    } catch (error) {
        if(error.message){
            return res.status(STATUSCODES.BAD_REQUEST).json({error:error.message})
        }
        console.log(error)
        res.status(STATUSCODES.INTERNAL_SERVER_ERROR).json({message:error.message})
    }
}
const newControl = async(req,res)=>{
  try {
    console.log(req)
    
  } catch (error) {
    
  }
}

const returnJwtRes = async(req,res)=>{
  try {
    if(!req.jwtResultValid){
        return res.status(STATUS_CODES.UNAUTHORIZED).json({message:MESSAGES.USER_NOT_AUTHENTICATED})
    }

    const userEmail = req.jwtResult
    console.log(userEmail,'jwt validator')

    return res.status(STATUS_CODES.OK).json({})
  } catch (error) {
    
  }
}

module.exports = { loginController, signupController,imageUpload,newControl, returnJwtRes};
