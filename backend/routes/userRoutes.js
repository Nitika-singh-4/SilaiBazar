// routes/userRoutes.js
import express from "express";
import { getUserProfile, updateUserProfile , updateTailorFullProfile} from "../controllers/userController.js";
import protect from "../middleware/authModdleware.js";

const router = express.Router();

router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile); // Optional for now
router.put("/tailor/update-profile", protect, updateTailorFullProfile);
export default router;
