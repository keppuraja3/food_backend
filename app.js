const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors")
require("dotenv").config();
require("./db").connectDB(); // Database connection
const mainRouter = require("./routes/mainRoute")


// app use ---
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser())
app.use(mainRouter)

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
app.use(cors(corsOptions))

PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log("Server running on ", PORT);
});
