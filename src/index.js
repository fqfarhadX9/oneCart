const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDB = require('./db/index.js')
const authRoute = require('./routes/auth.js')
dotenv.config()

const app = express();
const PORT = process.env.PORT || 6000

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.send("Server is running...");
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(" MongoDB Connection Failed!", error);
  });
