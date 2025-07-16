const express = require('express')
const router = express.Router()

const jwtAuth = require('../middlewares/jwtVerify')
const adminController = require('../controllers/adminController')
//controllers
router.get('/getUsersData',adminController.getUsersData)
router.post('/login',adminController.loginController)
router.get('/verifyJwt',adminController.verifyJwtToken)
router.delete('/deleteUser',jwtAuth.verifyToken,adminController.deleteUser)
router.patch('/editUser/:id',jwtAuth.verifyToken,adminController.editUser)
module.exports = router