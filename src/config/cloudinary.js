const cloudinary = require("cloudinary").v2;
const fs = require("fs")

const uploadOnCloudinary = async (localFilePath) => {
    cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
    })
    try {
        if(!localFilePath) return null;
        const response = await cloudinary.uploader.upload
        (localFilePath)
        fs.unlinkSync(localFilePath);
        return response.secure_url;
    } catch (error) {
        fs.unlinkSync(localFilePath); 
        return null;
    }
}

module.exports = uploadOnCloudinary