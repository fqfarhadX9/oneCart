const ApiError = require("../utils/apiError.js")
const asyncHandler = require("../utils/asyncHandler.js")
const User = require("../models/user.js")
const ApiResponse = require("../utils/ApiResponse.js")
const bcrypt = require("bcrypt")
const validator = require("validator")
const generateAccessToken = require("../config/token.js")


const registerUser = asyncHandler(async (req, res) => {
    const { email, password, name } = req.body

    if(!email || !password || !name) {
        throw new ApiError(400, "Please provide all the fields")
    }

    if(!validator.isEmail(email)) {
        throw new ApiError(400, "Please provide a valid email")
    }

    if(password.length < 6) {
        throw new ApiError(400, "Password must be at least 6 characters")
    }
 
    const existedUser = await User.findOne({email})
    if(existedUser) {
        throw new ApiError(400, "User already exists")
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        name,
        email,
        password: hashPassword
    })

    if(!user) {
        throw new ApiError(400, "Invalid user data")
    }

    const token = await generateAccessToken({id: user?._id.toString()})


    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 
    })

    user.password = undefined

    return res.status(201).json(
        new ApiResponse(201, user, "User registered successfully")
    )
})

const logInUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if(!email || !password) {
        throw new ApiError(400, "Please provide all the fields")
    }

    const user = await User.findOne({email})

    if(!user) {
        throw new ApiError(400, "user does not exist")
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if(!isPasswordCorrect) {
        throw new ApiError(400, "Incorrect password")
    }

    const token = await generateAccessToken({id: user?._id.toString()})

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000 
    })

    user.password = undefined

    return res.status(200).json(
        new ApiResponse(200, user, "User logged in successfully")
    )

})

const logOutUser = asyncHandler(async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
    })

    return res.status(200).json(
        new ApiResponse(200, {}, "User logged out successfully")
    )
})

const googleLogin = asyncHandler( async(req, res) => {
    const {name, email} = req.body

    if(!email || !name) {
        throw new ApiError(400, "Please provide all the fields")
    }

    let user = await User.findOne({email})

    if(!user) {
        user = await User.create({
            name,
            email
        })
    }

    const token = generateAccessToken({id: user._id.toString()})

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000 
    })

    user.password = undefined

    return res.status(200).json(
        new ApiResponse(200, user, "User logged in successfully")
    )

})


module.exports = {
    registerUser,
    logInUser,
    logOutUser,
    googleLogin
}