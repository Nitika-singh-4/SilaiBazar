import mongoose from "mongoose";

const tailorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shopName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    services: {
      type: [String], // e.g., ['Blouse Stitching', 'Pant Alteration']
      required: true,
    },
    pricing: {
      type: Map, // e.g., { 'blouse': 200, 'pant': 150 }
      of: Number,
    },
    photos: {
      type: [String], // cloudinary image URLs
    },
  },
  { timestamps: true }
);

const Tailor = mongoose.model("Tailor", tailorSchema);
export default Tailor;
