// controllers/orderController.js
import Order from "../models/Order.js";

export const placeOrder = async (req, res) => {
  const { tailorId, service } = req.body;
  try {
    const newOrder = await Order.create({
      user: req.user._id,
      tailor: tailorId,
      service,
    });
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("tailor", "shopName")
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
