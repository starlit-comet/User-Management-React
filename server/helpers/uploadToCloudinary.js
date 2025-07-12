const cloudinary = require('../config/cloudinary')
const streamifier = require('streamifier')
const MESSAGES = require('../utils/responseMessages')

const ALLOWED_TYPES= ['image/jpeg','image/png','image/webp','image/jpg']
const MAX_FILE_SIZE = 8

const uploadToCloudinary =  (file,folder='Default_Folder')=>{
    return new Promise((resolve,reject)=>{

        if(!file || !file.buffer ||!file.mimetype){
            console.log('no file got in cloudinary')
            return reject({message:MESSAGES.NO_FILE_PROVIDED})
        }
        
        if(!ALLOWED_TYPES.includes(file.mimetype)){
            return reject({message:MESSAGES.INVALID_FILE_FORMAT})
        }
        const fileSize = file.size/(1024*1024);
        if(fileSize>MAX_FILE_SIZE){
            return reject({message:MESSAGES.FILE_SIZE_EXCEEDED})
        }

        const uploadStream = cloudinary.uploader.upload_stream(
            {folder},
            (err,result)=>{
                if(result) resolve(result)
                else reject(err)
            }
        )
        streamifier.createReadStream(file.buffer).pipe(uploadStream)
    })
}

module.exports=uploadToCloudinary