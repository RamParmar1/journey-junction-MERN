import express from "express";
import { getAllUsers, deleteUser } from "../controllers/userController.js";
import { getAllBookings, updateBookingStatus, deleteBooking } from "../controllers/bookingController.js";
import { getAllTrips, createTrip, updateTrip, deleteTrip } from "../controllers/tripController.js";
import { protect, admin } from "../middlewares/authMiddlewares.js";

const router = express.Router();

// All admin routes require protect + admin middleware
router.use(protect, admin);

// ── Users ─────────────────────────────────────
router.get("/users",        getAllUsers);
router.delete("/users/:id", deleteUser);

// ── Bookings ──────────────────────────────────
router.get("/bookings",         getAllBookings);
router.put("/bookings/:id",     updateBookingStatus);
router.delete("/bookings/:id",  deleteBooking);

// ── Trips ─────────────────────────────────────
router.get("/trips",        getAllTrips);
router.post("/trips",       createTrip);
router.put("/trips/:id",    updateTrip);
router.delete("/trips/:id", deleteTrip);

export default router;