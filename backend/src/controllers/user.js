const User = require("../models/user.js")
const ApiError = require("../utils/apiError.js")
const ApiResponse = require("../utils/ApiResponse.js")
const asyncHandler = require("../utils/asyncHandler.js")

const getCurrentUser = asyncHandler(async (req, res) => {
    if (!req.user_id) {
        throw new ApiError(401, "Unauthorized: No user ID provided")
    }

    const user = await User.findById(req.user_id).select("-password -refreshToken")
    
    if (!user) {
        throw new ApiError(404, "User not found")
    }

    return res.status(200).json(
        new ApiResponse(200, user, "User retrieved successfully")
    );
})

const getCurrAdmin = asyncHandler(async(req, res) => {
    try {
        const adminEmail = req.adminEmail
        if(!adminEmail) {
            throw new ApiError(400, "Admin not found")
        }
        return res
           .status(200)
           .json(
            new ApiResponse(200, {email: adminEmail, role: "admin"},  "Admin retrieved successfully"
            )
        )
    } catch (error) {
        console.log("authorization error", error);
        if (error instanceof ApiError) throw error;
        throw new ApiError(401, error?.message || "Invalid access token");
    }
})

module.exports = {
    getCurrentUser,
    getCurrAdmin
};
