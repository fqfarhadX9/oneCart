const ApiError = require("../utils/apiError.js")
const asyncHandler = require("../utils/asyncHandler.js")
const User = require("../models/user.js")
const ApiResponse = require("../utils/ApiResponse.js")
const bcrypt = require("bcrypt")
const validator = require("validator")
const {generateAccessToken, generateAdminAccessToken} = require("../config/token.js")


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
        sameSite: "Lax",
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
        secure: false,
        sameSite: "Lax",
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
        sameSite: "Lax",
    })

    return res.status(200).json(
        new ApiResponse(200, {}, "User logged out successfully")
    )
})

const googleLogin = asyncHandler(async (req, res) => {
    try {
        // console.log("REQ.BODY:", req.body);
        const { name, email } = req.body;
        if (!email || !name) throw new ApiError(400, "Missing fields");

        let user = await User.findOne({ email });
        if (!user) user = await User.create({ name, email });

        const token = generateAccessToken({ id: user._id.toString() });

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        user.password = undefined;

        return res.status(200).json(
            new ApiResponse(200, user, "User logged in successfully")
        );
    } catch (err) {
        console.error("GOOGLE LOGIN ERROR:", err);
        throw err; 
    }
});

const adminLogin = asyncHandler(async(req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new ApiError(400, "Missing email or password");

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = generateAdminAccessToken(email);

      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res
        .status(201)
        .json(new ApiResponse(201, token, "Admin logged in successfully"));
    } else {
      throw new ApiError(401, "Invalid email or password");
    }
  } catch (error) {
    console.log("Admin logged in Error", error);

    if (error instanceof ApiError) throw error;

    throw new ApiError(500, error.message || "Internal server error");
  }
})

module.exports = {
    registerUser,
    logInUser,
    logOutUser,
    googleLogin,
    adminLogin
}