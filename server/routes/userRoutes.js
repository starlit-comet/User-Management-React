const express = require('express')
const router = express.Router()


// multer for img stream
const multer = require('multer')
const upload = multer({storage:multer.memoryStorage()}) 



const userController = require('../controllers/userController')

router.post('/login',userController.loginController)
router.post('/signup',userController.signupController)
router.post('/upload/profileImage',upload.single('image'),userController.imageUpload)

module.exports = router