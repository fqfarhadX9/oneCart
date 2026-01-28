const express = require('express')
const { addProduct, listProduct, removeProduct } = require('../controllers/product.js')
const upload = require('../middlewares/multer')
const adminAuth = require('../middlewares/adminAuth.js')

const productRoutes = express.Router()
productRoutes.post("/addProduct", upload.fields([
    {name: "image1", maxCount: 1},
    {name: "image2", maxCount: 1},
    {name: "image3", maxCount: 1},
    {name: "image4", maxCount: 1}]) ,addProduct)
productRoutes.get("/list", listProduct)
productRoutes.post("/remove/:id", adminAuth, removeProduct)

module.exports = productRoutes