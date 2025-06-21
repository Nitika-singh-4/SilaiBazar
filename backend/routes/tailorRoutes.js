import express from "express"
import { createOrUpdateTailorProfile, getAllTailors, getTailorById } from "../controllers/tailorController.js"
import protect from "../middleware/authModdleware.js"

const router = express.Router();

router.post("/profile", protect, createOrUpdateTailorProfile);
router.get("/", getAllTailors);
router.get("/:id", getTailorById);

export default router;