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

// for admin

const allOrders = asyncHandler(async(req, res) => {
    try {
        const orders = await Order.find()
        if (orders.length === 0) {
           throw new apiError(404, "No orders found")
        }
    
    
        return res
            .status(200)
            .json(new ApiResponse(200, orders, "All orders fetched successfully"))
    } catch (error) {
        console.log(error)

        if (error instanceof ApiError) throw error
        throw new ApiError(500, error.message || "Internal server error")
    }
})

const updateStatus = asyncHandler(async (req, res) => {
    const { orderId, status } = req.body

    if (!orderId || !status) {
        throw new ApiError(400, "All fields are required")
    }

    const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { status },
        { new: true } 
    )

    if (!updatedOrder) {
        throw new ApiError(404, "Order not found")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updatedOrder, "Status updated successfully"))
});


module.exports = {
    placeOrder,
    userOrder,
    allOrders,
    updateStatus
}