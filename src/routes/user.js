const express = require('express')
const getCurrentUser = require('../controllers/user')
const verifyJwt = require('../middlewares/authorization')
const userRoutes = express.Router()

userRoutes.get('/getCurrentUser', verifyJwt, getCurrentUser)

module.exports = userRoutes