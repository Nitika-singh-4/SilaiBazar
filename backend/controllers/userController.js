// controllers/userController.js
import User from "../models/User.js";
import Tailor from "../models/Tailor.js";
// @desc   Get current logged-in user profile
// @route  GET /api/users/profile
// @access Private
export const getUserProfile = async (req, res) => {
  try {
    const user = req.user; // from authMiddleware
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// @desc   Update user profile (optional)
// @route  PUT /api/users/profile
// @access Private
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password; // will be hashed by pre-save middleware
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
export const updateTailorFullProfile = async (req, res) => {
  try {
    const { shopName, name, email, phoneNumber, isAvailable, address, latitude, longitude } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();

    const tailor = await Tailor.findOne({ user: req.user._id });
    if (!tailor) return res.status(404).json({ msg: "Tailor profile not found" });

    tailor.shopName = shopName || tailor.shopName;
    tailor.phoneNumber = phoneNumber || tailor.phoneNumber;
    tailor.isAvailable = isAvailable !== undefined ? isAvailable : tailor.isAvailable;
    tailor.address = address || tailor.address;

    if (latitude && longitude) {
      tailor.location.coordinates = [parseFloat(longitude), parseFloat(latitude)];
    }

    await tailor.save();

    res.status(200).json({
      msg: "Tailor and user profile updated successfully",
      user,
      tailor,
    });
  } catch (err) {
    console.error("Error updating tailor profile:", err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
