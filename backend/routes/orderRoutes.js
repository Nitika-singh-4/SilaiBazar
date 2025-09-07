// routes/orderRoutes.js
import express from "express";
import { getUserOrders, placeOrder, getTailorOrders, updateOrderStatus } from "../controllers/orderController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, placeOrder);
router.get("/", authMiddleware, getUserOrders);

// ✅ Tailor orders
router.get("/tailor", authMiddleware, getTailorOrders);

// ✅ Update status
router.put("/:id/status", authMiddleware, updateOrderStatus);

export default router;
