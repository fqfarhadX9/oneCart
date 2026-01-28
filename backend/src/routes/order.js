const express = require("express")
const verifyJwt = require("../middlewares/authorization.js")
const { placeOrder, userOrder, allOrders, updateStatus } = require("../controllers/order.js")
const verifyAdminJwt = require("../middlewares/adminAuth.js")

const orderRotes = express.Router()

orderRotes.post("/placeorder", verifyJwt, placeOrder)
orderRotes.get("/userorder", verifyJwt, userOrder)

orderRotes.get("/list", verifyAdminJwt, allOrders)
orderRotes.post("/status",  verifyAdminJwt, updateStatus)

module.exports = orderRotes