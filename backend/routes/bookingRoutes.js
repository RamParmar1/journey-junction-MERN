import express from "express";
import {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
  deleteBooking,
  getBooking,
  cancelBooking
} from "../controllers/bookingController.js";
import { protect } from "../middlewares/authMiddlewares.js";

const router = express.Router();

// User routes
router.post("/", protect, createBooking);
router.get("/mybookings", protect, getMyBookings);
router.get("/:id", protect, getBooking);
router.put("/:id/cancel", protect, cancelBooking);
router.delete("/:id", protect, deleteBooking);

// Admin routes
router.get("/", protect, getAllBookings);
router.put("/:id/status", protect, updateBookingStatus);

export default router;