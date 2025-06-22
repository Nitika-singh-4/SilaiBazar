import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Tailor from "../models/Tailor.js";
dotenv.config();


const generateToken = (user) => {
    // console.log("JWT_SECRET type:", typeof process.env.JWT_SECRET);
    // console.log("JWT_SECRET value:", process.env.JWT_SECRET);
  return jwt.sign(
    { id: user._id, role: user.role },
    "q3$!x@B9#P2z!aLk7VuC@dE4kW1rZ8gX",
    { expiresIn: "1h" }
  );
};

// @route   POST /api/auth/signup
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  console.log("SIGNUP REQUEST BODY:", req.body);

  try {
    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "User already exists" });

    // Create new user in Users collection
    const newUser = await User.create({ name, email, password, role });

    // If the user is a tailor, create a minimal Tailor document
    if (role === 'tailor') {
      await Tailor.create({
        user: newUser._id,
        services: [],        // empty default values
        pricing: {},
        photos: [],
        location: {
          type: 'Point',
          coordinates: [0, 0] // placeholder, to be updated later
        }
      });
    }

    // Return user data and token
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      token: generateToken(newUser),
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
  const { email, password } = req.body; // <-- fixed typo
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user),
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
