const express = require('express')
const router = express.Router()
const jwtAuth = require('../middlewares/jwtVerify')

// multer for img stream
const multer = require('multer')
const upload = multer({storage:multer.memoryStorage()}) 



const userController = require('../controllers/userController')

router.post('/login',userController.loginController)
router.post('/signup',userController.signupController)
// router.get('/getid/:id/:id1',userController.newControl)
router.post('/upload/profileImage',jwtAuth.verifyToken,upload.single('image'),userController.imageUpload)
router.get('/jwtCheck',jwtAuth.verifyToken,userController.returnJwtRes)

module.exports = router