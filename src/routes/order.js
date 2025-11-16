const express = require("express")
const verifyJwt = require("../middlewares/authorization.js")
const { placeOrder, userOrder } = require("../controllers/order.js")

const orderRotes = express.Router()

orderRotes.post("/placeorder", verifyJwt, placeOrder)
orderRotes.get("/userorder", verifyJwt, userOrder)

module.exports = orderRotes