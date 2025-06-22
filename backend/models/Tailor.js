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
      
    },
    address: {
      type: String,
      default: "",
    },
    // services: {
    //   type: [String], // e.g., ['Blouse Stitching', 'Pant Alteration']
    //   default: [],
    // },
    pricing: {
      type: Map,
      of: Number, // e.g., { 'blouse': 200, 'pant': 150 }
    },
    photos: {
      type: [String], // Cloudinary image URLs
      default: [],
    },
    phoneNumber: {
      type: String, // ✅ Change to String for +91 or 10-digit numbers with leading zero
      default: "",
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: [0, 0],
      },
    },
  },
  { timestamps: true }
);

// ✅ Geospatial index
tailorSchema.index({ location: "2dsphere" });

const Tailor = mongoose.model("Tailor", tailorSchema);
export default Tailor;
