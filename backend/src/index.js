const express = require('express') 
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDB = require('./db/index.js')
const authRoute = require('./routes/auth.js')
const userRoutes = require('./routes/user.js')
const productRoutes = require('./routes/product.js')
const cartRotes = require('./routes/cart.js')
const orderRotes = require('./routes/order.js')
dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000

// ===== CORS =====
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); 
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}))

// ===== MIDDLEWARES =====
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser())
app.use(express.static("public"))

// ===== ROUTES =====
app.use("/api/auth", authRoute)
app.use("/api/user", userRoutes)
app.use("/api/product", productRoutes)
app.use("/api/cart", cartRotes)
app.use("/api/order", orderRotes)

app.get("/", (req, res) => {
  res.send("Server is running...")
});

// ===== DB & SERVER =====
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error("MongoDB Connection Failed!", error)
  })
