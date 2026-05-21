import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import connectDB from "./config/db.js";

// Routes
import authRoutes    from "./routes/authRoutes.js";
import userRoutes    from "./routes/userRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import packageRoutes from "./routes/packageRoutes.js";
import tripRoutes    from "./routes/tripRoutes.js";
import adminRoutes   from "./routes/adminRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ── Security Middlewares ────────────────────────
app.use(helmet()); // Set security HTTP headers
app.use(mongoSanitize()); // Prevent NoSQL injection
app.use(hpp()); // Prevent HTTP Parameter Pollution

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: "Too many requests from this IP, please try again in 15 minutes",
});
app.use("/api/", limiter); // Apply rate limiting to API routes

// Configure CORS for production security
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());

// ── Health check ──────────────────────────────
app.get("/", (req, res) => {
  res.send("✈️ JourneyJunction API is running...");
});

// ── Public Routes ─────────────────────────────
app.use("/api/auth",     authRoutes);    // POST /api/auth/login, /api/auth/register
app.use("/api/users",    userRoutes);    // existing user routes (profile etc)
app.use("/api/bookings", bookingRoutes); // user booking routes
app.use("/api/packages", packageRoutes); // packages (existing)
app.use("/api/trips",    tripRoutes);    // GET /api/trips (public list)

// ── Admin Routes ──────────────────────────────
// All protected by protect + admin middleware
app.use("/api/admin",    adminRoutes);
// Gives:
//   GET    /api/admin/users
//   DELETE /api/admin/users/:id
//   GET    /api/admin/bookings
//   PUT    /api/admin/bookings/:id
//   DELETE /api/admin/bookings/:id
//   GET    /api/admin/trips
//   POST   /api/admin/trips
//   PUT    /api/admin/trips/:id
//   DELETE /api/admin/trips/:id

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));