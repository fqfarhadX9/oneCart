const express = require('express')
const {getCurrentUser, getCurrAdmin} = require('../controllers/user')
const verifyJwt = require('../middlewares/authorization')
const verifyAdminJwt = require('../middlewares/adminAuth')
const userRoutes = express.Router()

userRoutes.get('/getCurrentUser', verifyJwt, getCurrentUser)
userRoutes.get('/getCurrAdmin', verifyAdminJwt, getCurrAdmin)

module.exports = userRoutes