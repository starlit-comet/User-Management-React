require('@dotenvx/dotenvx').config()
const mongoose = require('mongoose')

const connetDb = async()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI_LOCALHOST,{})
        console.log(`MongoDb Cloud Connected`)
    } catch (error) {
        console.log(error)
        process.exit(1)
        
    }
}
module.exports= connetDb