// controllers/bookingController.js
import Booking from "../models/Booking.js";
import Tailor from "../models/Tailor.js";

// =======================
// USER SIDE — Create Booking
// =======================
export const createBooking = async (req, res) => {
  const { tailorId, service, date, time } = req.body;

  try {
    // Check if the tailor exists
    const tailor = await Tailor.findById(tailorId);
    if (!tailor) {
      return res.status(404).json({ msg: "Tailor not found" });
    }

    // Create booking
    const newBooking = await Booking.create({
      user: req.user._id,
      tailor: tailorId,
      service,
      date,
      time,
      status: "pending",
    });

    res.status(201).json(newBooking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// =======================
// USER SIDE — Get My Bookings
// =======================
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("tailor", "shopName location") // Tailor info
      .populate("user", "name email"); // Optional: user info
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// =======================
// TAILOR SIDE — Get Tailor Bookings
// =======================
export const getTailorBookings = async (req, res) => {
  try {
    // Find tailor profile of logged-in user
    const tailor = await Tailor.findOne({ user: req.user._id });
    if (!tailor) {
      return res.status(404).json({ msg: "Tailor profile not found" });
    }

    // Find bookings for this tailor
    const bookings = await Booking.find({ tailor: tailor._id })
      .populate("user", "name email") // Fetch customer info
      .populate("tailor", "shopName"); // Optional tailor info
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching tailor bookings:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// =======================
// TAILOR SIDE — Update Booking Status
// =======================
export const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // expected: "accepted" or "rejected"

  if (!["accepted", "rejected"].includes(status)) {
    return res.status(400).json({ msg: "Invalid status value" });
  }

  try {
    // Check if booking exists
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    // Ensure logged-in tailor owns this booking
    const tailor = await Tailor.findOne({ user: req.user._id });
    if (!tailor || booking.tailor.toString() !== tailor._id.toString()) {
      return res.status(403).json({ msg: "Not authorized to update this booking" });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json(booking);
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ msg: "Server error" });
  }
};
