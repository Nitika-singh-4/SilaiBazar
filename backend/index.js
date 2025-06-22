
import express from "express";
import dotenv from "dotenv";
import cors from "cors"
dotenv.config();
import tailorRoutes from "./routes/tailorRoutes.js";
import orderRoutes from "./models/Order.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(express.json());
app.use(cors())

app.use("/api/auth", authRoutes); // 👈 attaches auth routes
app.use("/api/tailors", tailorRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes)
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
