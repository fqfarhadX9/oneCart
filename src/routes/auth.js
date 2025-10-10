const express = require('express')
const { registerUser, 
    logInUser, 
    logOutUser } = require('../controllers/auth.js')

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', logInUser)
router.get('/logout', logOutUser)

module.exports = router