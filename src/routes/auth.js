const express = require('express')
const { registerUser, 
    logInUser, 
    logOutUser, 
    googleLogin} = require('../controllers/auth.js')

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', logInUser)
router.get('/logout', logOutUser)
router.post('/google-login', googleLogin)

module.exports = router