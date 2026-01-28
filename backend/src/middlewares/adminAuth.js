const jwt = require("jsonwebtoken")
const asyncHandler = require("../utils/asyncHandler.js")
const ApiError = require("../utils/apiError.js")

const verifyAdminJwt = asyncHandler((req, res, next) => {
    try {
        const token = req.cookies.token
        if(!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
        if(!verifyToken) {
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.adminEmail = process.env.ADMIN_EMAIL
        next()
    } catch (error) {
        console.log("authorization error");
        throw new ApiError(401, error?.message || "Invalid access token")
    }
})

module.exports = verifyAdminJwt