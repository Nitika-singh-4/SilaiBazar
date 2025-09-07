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
// Tailor sees all orders for their shop
export const getTailorOrders = async (req, res) => {
  try {
    const orders = await Order.find({ tailor: req.user._id }) // assuming tailor._id is stored in orders
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ msg: "Order not found" });

    order.status = status;
    await order.save();
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

