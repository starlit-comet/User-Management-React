require ('@dotenvx/dotenvx').config()
const express = require ('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const cors = require('cors')
const cloudinary = require('cloudinary').v2

//Routes
const adminRoute = require('./routes/adminRoutes')
const userRoute  = require('./routes/userRoutes')

const connectDb = require('./config/connectDb')

const app = express()
const corsOptions={
    origin:`http://localhost:${process.env.FRONTEND_PORT}`,
    credentials:true,
}
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors(corsOptions))
app.use('/admin',adminRoute)
app.use('/user',userRoute)
// console.log(process.env.PORT)
connectDb()
app.listen(process.env.SERVER_PORT,()=>console.log(`server_runnning on ${process.env.SERVER_PORT}`))
