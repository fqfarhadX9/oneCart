const asyncHandler = require("../utils/asyncHandler.js")
const ApiResponse = require("../utils/apiResponse.js")
const ApiError = require("../utils/apiError.js")
const Order = require("../models/order.js")
const User = require("../models/user.js")

const placeOrder = asyncHandler(async(req, res) => {
    try {
        const {address, items, amount} = req.body
        if (!address || !items || !amount) {
          throw new ApiError(400, "Missing required fields")
        }
        const userId = req.user_id
        const orderData = {
            items,
            amount, 
            address,
            userId,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now()
        }
    
        const newOrder = new Order(orderData)
        await newOrder.save()
    
        await User.findByIdAndUpdate(userId, {cartData: {}})
    
        return res.status(201).json(new ApiResponse(201, {}, "Order place successfully"))
    } catch (error) {
        console.log(error)

        if (error instanceof ApiError) throw error;
        throw new ApiError(500, error.message || "Internal server error");
    }
})

const userOrder = asyncHandler(async (req, res) => {
    try {
        const userId = req.user_id;

        const orders = await Order.find({ userId })
        if (!orders || orders.length === 0) {
            throw new ApiError(404, "No orders found for this user")
        }

        return res
            .status(200)
            .json(new ApiResponse(200, orders, "User orders fetched successfully"))
    } catch (error) {
        console.log(error)

        if (error instanceof ApiError) throw error
        throw new ApiError(500, error.message || "Internal server error")
    }
});



module.exports = {
    placeOrder,
    userOrder
}