const jwt = require("jsonwebtoken")
const asyncHandler = require("../utils/asyncHandler.js")
const ApiError = require("../utils/apiError.js")
const User = require("../models/user.js")

const verifyJwt = asyncHandler(async(req, res, next) => {
    try {
        const token = req.cookies.token
        if(!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(verifyToken.id).select("-password")
        if (!user) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        req.user = user
        next()
    } catch (error) {
        console.log("authorization error")
        throw new ApiError(401, error?.message || "Invalid access token")
    }
})

module.exports = verifyJwt