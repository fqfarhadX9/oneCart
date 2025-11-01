const express = require("express")
const verifyJwt = require("../middlewares/authorization.js")
const { getUserCart, addtoCart, updateCart } = require("../controllers/cart.js")

const cartRotes = express.Router()

cartRotes.get("/getcart", verifyJwt, getUserCart)
cartRotes.post("/addcart", verifyJwt, addtoCart)
cartRotes.post("/updatecart", verifyJwt, updateCart)

module.exports = cartRotes