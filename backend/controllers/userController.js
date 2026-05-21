import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// ── Register ─────────────────────────────────
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({
      _id:     user._id,
      name:    user.name,
      email:   user.email,
      role:    user.isAdmin ? "admin" : "user",
      isAdmin: user.isAdmin,
      token:   generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// ── Login ─────────────────────────────────────
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id:     user._id,
      name:    user.name,
      email:   user.email,
      role:    user.isAdmin ? "admin" : "user",   // ← frontend uses role
      isAdmin: user.isAdmin,
      token:   generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// ── Get own profile ───────────────────────────
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id:     user._id,
      name:    user.name,
      email:   user.email,
      role:    user.isAdmin ? "admin" : "user",
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// ── Admin: Get ALL users ──────────────────────
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password").sort({ createdAt: -1 });
  res.json(users);
});

// ── Admin: Delete user ────────────────────────
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  await user.deleteOne();
  res.json({ message: "User deleted successfully" });
});

export { registerUser, authUser, getUserProfile, getAllUsers, deleteUser };