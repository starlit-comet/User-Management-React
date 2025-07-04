const express = require('express')
const router = express.Router()



const userController = require('../controllers/userController')

router.post('/login',userController.loginController)
router.post('/signup',userController.signupController)

module.exports = router