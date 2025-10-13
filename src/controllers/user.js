const User = require("../models/user");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/ApiResponse");

const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/user");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/ApiResponse");

const getCurrentUser = asyncHandler(async (req, res) => {
    if (!req.user_id) {
        throw new ApiError(401, "Unauthorized: No user ID provided");
    }

    const user = await User.findById(req.user_id).select("-password -refreshToken");
    
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json(
        new ApiResponse(200, user, "User retrieved successfully")
    );
});

module.exports = getCurrentUser;
