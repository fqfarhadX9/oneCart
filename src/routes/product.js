const express = require('express')
const { addProduct } = require('../controllers/product')
const upload = require('../middlewares/multer')

const productRoutes = express.Router()
productRoutes.post("addProduct", upload.fields([
    {name: "image1", maxCount: 1},
    {name: "image2", maxCount: 1},
    {name: "image3", maxCount: 1},
    {name: "image4", maxCount: 1}]) ,addProduct)

module.exports = productRoutes