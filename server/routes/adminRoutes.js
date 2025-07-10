const express = require('express')
const router = express.Router()


const adminController = require('../controllers/adminController')
//controllers
router.get('/getUsersData',adminController.getUsersData)
router.post('/login',adminController.loginController)
router.get('/verifyJwt',adminController.verifyJwtToken)
module.exports = router