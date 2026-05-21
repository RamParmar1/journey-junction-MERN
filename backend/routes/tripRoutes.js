import express from "express";
import {
  getAllTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
} from "../controllers/tripController.js";
import { protect, admin } from "../middlewares/authMiddlewares.js";

const router = express.Router();

// Public
router.get("/",    getAllTrips);
router.get("/:id", getTripById);

// Admin only
router.post("/",       protect, admin, createTrip);
router.put("/:id",     protect, admin, updateTrip);
router.delete("/:id",  protect, admin, deleteTrip);

export default router;