
import express from "express";
import {
  createOrUpdateTailorProfile,
  getAllTailors,
  getNearbyTailors,
  getMyTailorProfile,
  updateTailorPricing
} from "../controllers/tailorController.js";
import protect from "../middleware/authModdleware.js";

const router = express.Router();

router.post("/profile", protect, createOrUpdateTailorProfile);
router.get("/nearby", getNearbyTailors);   // ✅ Moved this ABOVE /:id
router.get("/", getAllTailors);
router.get("/:id",protect, getMyTailorProfile);
router.put("/update-pricing", protect, updateTailorPricing);

export default router;

