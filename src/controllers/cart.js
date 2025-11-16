const asyncHandler = require("../utils/asyncHandler.js")
const ApiError = require("../utils/apiError.js")
const ApiResponse = require("../utils/apiResponse.js")
const User = require("../models/user.js")

const addtoCart = asyncHandler(async(req, res) => {
   try {
     const {itemId, size} = req.body
      if (!itemId || !size) {
      throw new ApiError(400, "Item ID and size are required");
      }

     const user = await User.findById(req.user_id)
     if(!user) {
         throw new ApiError(400, "User not found")
     }
 
     let cartData = user.cartData || {}
     if(cartData[itemId]) {
         if(cartData[itemId][size]) {
             cartData[itemId][size] += 1;
         } else {
             cartData[itemId][size] = 1;
         }
     } else {
         cartData[itemId] = {}
         cartData[itemId][size] = 1;
     }
     await User.findByIdAndUpdate(req.user_id, {cartData})
 
     return res
        .status(201)
        .json(new ApiResponse(201, cartData, "added to cart"))
   } catch (error) {
    console.log(error)
    if (error instanceof ApiError) throw error
    
    throw new ApiError(500, error.message || "Internal server error")
   }
})

const updateCart = asyncHandler(async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body

    if (!itemId || !size) {
      throw new ApiError(400, "Item ID and size are required");
    }

    if (quantity == null || typeof quantity !== "number") {
      throw new ApiError(400, "Quantity must be a number");
    }

    const userData = await User.findById(req.user_id);
    if (!userData) {
      throw new ApiError(404, "User not found");
    }

    let cartData = userData.cartData || {};

    if (!cartData[itemId] || !cartData[itemId][size]) {
      throw new ApiError(404, "Item not found in cart");
    }

    if (quantity <= 0) {
      delete cartData[itemId][size];

      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = quantity;
    }

    await User.findByIdAndUpdate(req.user_id, { cartData });

    return res
      .status(200)
      .json(new ApiResponse(200, cartData, "Cart updated successfully"));
  } catch (error) {
    console.log(error);
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, error.message || "Internal server error");
  }
})

const getUserCart = asyncHandler(async (req, res) => {
  try {
    const userData = await User.findById(req.user_id);

    if (!userData) {
      throw new ApiError(404, "User not found");
    }

    const cartData = userData.cartData || {};

    return res
      .status(200)
      .json(new ApiResponse(200, cartData, "User cart fetched successfully"));
  } catch (error) {
    console.log(error);
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, error.message || "Internal server error");
  }
});


module.exports = {
    addtoCart,
    updateCart,
    getUserCart
}