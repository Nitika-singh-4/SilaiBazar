// routes/bookingRoutes.js
import express from "express";
import {
  createBooking,
  getUserBookings,
  getTailorBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js";
import protect from "../middleware/authModdleware.js";

const router = express.Router();

// User creates a booking
router.post("/", protect, createBooking);

// User fetches their bookings
router.get("/my-bookings", protect, getUserBookings);

// Tailor fetches their bookings
router.get("/tailor", protect, getTailorBookings);

// Tailor updates booking status (accept/reject)
router.put("/:id/status", protect, updateBookingStatus);

export default router;
