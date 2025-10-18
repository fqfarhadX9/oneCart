const express = require('express')
const { registerUser, 
    logInUser, 
    logOutUser, 
    googleLogin,
    adminLogin} = require('../controllers/auth.js')

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', logInUser)
router.get('/logout', logOutUser)
router.post('/google-login', googleLogin)
router.post('/admin-login', adminLogin)

module.exports = router