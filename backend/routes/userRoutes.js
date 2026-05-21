import express from "express";
import {
  registerUser,
  authUser,
  getUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", authUser);
router.get("/profile", protect, getUserProfile);

export default router;
