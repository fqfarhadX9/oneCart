const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const connectDB = require('./db/index.js')

const app = express()
const PORT = process.env.PORT || 6000

connectDB().
then(() => {
  app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
  })
}).catch((error) => {
  console.log("MongoDB Connection Failed!", error)
})