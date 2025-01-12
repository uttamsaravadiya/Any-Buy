import dotenv from "dotenv";
import mongoose from "mongoose";
const MONGODB_URI = "mongodb://localhost:27017/any-buy";
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
