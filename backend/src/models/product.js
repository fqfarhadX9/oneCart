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
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        name: { 
            type: String, 
            required: true 
        },
        comment: { 
            type: String, 
            required: true 
        },
        rating: { 
            type: Number, 
            default: 0 
        },
        createdAt: { 
            type: Date, 
            default: Date.now 
        }
        
    }]
}, {timestamps: true})

const Product = mongoose.model("Product", productSchema)

module.exports = Product