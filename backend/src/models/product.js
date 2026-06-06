const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image1: {
        type: String,
        required: true
    },
    image2: {
        type: String,
    },
    image3: {
        type: String,
    },
    image4: {
        type: String,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    sizes: {
        type: Array,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
    bestSeller: {
        type: Boolean
    },
    reviews: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        userName: { 
            type: String, 
        },
        comment: { 
            type: String, 
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        date: { 
            type: Date, 
            default: Date.now 
        }
        
    }]
}, {timestamps: true})

const Product = mongoose.model("Product", productSchema)

module.exports = Product