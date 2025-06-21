import express from "express";
import dotenv from "dotenv";
dotenv.config();
import tailorRoutes from "./routes/tailorRoutes.js";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes); // 👈 attaches auth routes
app.use("/api/tailors", tailorRoutes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
