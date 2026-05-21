import express from "express";
import {
  getPackages,
  getPackage,
  createPackage,
  updatePackage,
  deletePackage
} from "../controllers/packageController.js";
import { protect } from "../middlewares/authMiddlewares.js";

const router = express.Router();

// Public routes
router.get("/", getPackages);
router.get("/:id", getPackage);

// Admin routes
router.post("/", protect, createPackage);
router.put("/:id", protect, updatePackage);
router.delete("/:id", protect, deletePackage);

export default router;