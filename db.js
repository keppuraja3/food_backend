const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URL = process.env.MONGODB_URL;

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Database connected");
  } catch (error) {
    console.log("Database Error: ", error);
    process.exit(1);
  }
}

module.exports = { connectDB };
