import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
const JWT_SECRET = "Superman";

export const register = async (req, res) => {
  try {
    const { fullName, email, password, userType, phone, address } = req.body;
    // console.log("User Registration Data:", {
    //   fullName,
    //   email,
    //   password,
    //   userType,
    //   phone,
    //   address,
    // });

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      userType,
      phone,
      address,
    });

    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      userType: user.userType,
    });
    await user.save();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("User Login Data:", {
      email,
      password,
    });

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!JWT_SECRET) {
      console.error("JWT_SECRET is not defined");
      return res.status(500).json({ message: "Internal server error" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      userType: user.userType,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
