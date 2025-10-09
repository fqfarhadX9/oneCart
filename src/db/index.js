const mongoose = require('mongoose');
const DB_NAME = require('../constants.js')

const connectMongoDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`Mongoose Connected Successfully! DB HOST: $
        {connectionInstance.connection.host}`)
        return connectionInstance;
    } catch (error) {
        console.log("mongodb Connection Failed: ", error)
        process.exit(1);
    }
}

module.exports = connectMongoDb