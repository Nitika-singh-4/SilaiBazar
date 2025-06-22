
import Tailor  from "../models/Tailor.js";

export const createOrUpdateTailorProfile = async (req, res) => {
  try {
    const { shopName, address, services, pricing, photos, location } = req.body;

    if (!location || !location.coordinates || location.coordinates.length !== 2) {
      return res.status(400).json({ msg: "Location with valid coordinates is required" });
    }

    let tailor = await Tailor.findOne({ user: req.user._id });

    if (tailor) {
      tailor.shopName = shopName;
      tailor.address = address;
      tailor.services = services;
      tailor.pricing = pricing;
      tailor.photos = photos;
      tailor.location = location;  // 🔥 This is important!
    } else {
      tailor = new Tailor({
        user: req.user._id,
        shopName,
        address,
        services,
        pricing,
        photos,
        location,  // 🔥 This is important!
      });
    }

    await tailor.save();
    res.status(200).json(tailor);
  } catch (err) {
    console.error("Error creating/updating tailor:", err.message);
    res.status(500).json({ msg: err.message });
  }
};

export const getAllTailors = async (req, res) => {
    try{
        const tailors = await Tailor.find().populate("user", "name email");
        res.status(200).json(tailors);
    } catch(err){
        res.status(500).json({msg: err.message});
    }
}
// controller/tailorController.js
export const getMyTailorProfile = async (req, res) => {
  try {
    console.log(req.user._id)
    const tailor = await Tailor.findOne({ user: req.user._id }).populate("user", "name email");

    if (!tailor) {
      return res.status(404).json({ msg: "Tailor not found" });
    }

    res.status(200).json(tailor);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// controllers/tailorController.js
export const getNearbyTailors = async (req, res) => {
  try {
    const { lat, lng, radius } = req.query;

    if (!lat || !lng || !radius) {
      return res.status(400).json({ msg: "Latitude, longitude, and radius are required" });
    }

    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);
    const radiusInRadians = parseFloat(radius) / 6378.1; // Earth's radius in km

    const tailors = await Tailor.find({
      location: {
        $geoWithin: {
          $centerSphere: [[lngNum, latNum], radiusInRadians],
        },
      },
    }).populate("user"); // ✅ Populate user details

    res.status(200).json(tailors);
  } catch (error) {
    console.error("Error in getNearbyTailors:", error.message);
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};


export const updateTailorPricing = async (req, res) => {
  try {
    const tailor = await Tailor.findOne({ user: req.user._id });
    if (!tailor) return res.status(404).json({ message: "Tailor not found" });

    tailor.pricing = req.body.pricing;
    await tailor.save();

    res.json({ message: "Pricing updated successfully", pricing: tailor.pricing });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
