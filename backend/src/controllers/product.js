const asyncHandler = require("../utils/asyncHandler.js")
const ApiError = require("../utils/apiError.js")
const ApiResponse = require("../utils/apiResponse.js")
const uploadOnCloudinary = require("../config/cloudinary")
const Product = require("../models/product.js")

const addProduct = asyncHandler(async (req, res) => {
    try {
        const {name, description, price, category, subCategory, sizes, bestSeller} = req.body
        if(!name || !description || !price || !category || !subCategory || !sizes) {
            throw new ApiError(400, "all fields are required")
        }

        const image1LocalPath = req.files?.image1?.[0]?.path;
        const image2LocalPath = req.files?.image2?.[0]?.path;
        const image3LocalPath = req.files?.image3?.[0]?.path;
        const image4LocalPath = req.files?.image4?.[0]?.path;


        const image1 = image1LocalPath ? await uploadOnCloudinary(image1LocalPath) : null
        const image2 = image2LocalPath ? await uploadOnCloudinary(image2LocalPath) : null
        const image3 = image3LocalPath ? await uploadOnCloudinary(image3LocalPath) : null
        const image4 = image4LocalPath ? await uploadOnCloudinary(image4LocalPath) : null
    
        const productData = {
            name,
            description,
            price : Number(price),
            category,
            subCategory,
            sizes : JSON.parse(sizes),
            date: Date.now(),
            bestSeller: bestSeller==="true" ? true : false,
            image1,
            image2,
            image3,
            image4
        }
    
        const product = await Product.create(productData)
    
        if(!product) {
            throw new ApiError(400, "Invalid Requests")
        }
        return res
           .status(201)
           .json( new ApiResponse(
            201, product, "product added successfully"
            )
        )
    } catch (error) {
        console.log("error while adding product", error)
        if (error instanceof ApiError) throw error;
        throw new ApiError(500, error?.message || "Internal server error");

    }
})

const listProduct = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  if (products.length === 0) {
    throw new ApiError(404, "No products found")
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      products,
      "Products fetched successfully"
    )
  )
})

const removeProduct = asyncHandler(async (req, res) => {
  const {id} = req.params
  const product = await Product.findByIdAndDelete(id)

  if (!product) {
    throw new ApiError(404, "No product found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      product,
      "Product deleted successfully"
    )
  )
})


module.exports = {
    addProduct,
    listProduct,
    removeProduct
}