// controllers/bookingController.js
import Booking from "../models/Booking.js";

// USER SIDE — Place Booking
export const createBooking = async (req, res) => {
  const { tailorId, service, date, time } = req.body;
  try {
    const newBooking = await Booking.create({
      user: req.user._id,
      tailor: tailorId,
      service,
      date,
      time,
    });
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// USER SIDE — Get user bookings
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("tailor", "shopName address services")
      .sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// TAILOR SIDE — Get tailor bookings
export const getTailorBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ tailor: req.user._id })
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// TAILOR SIDE — Update booking status
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ msg: "Booking not found" });

    // Check if the logged-in tailor owns the booking
    if (booking.tailor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
