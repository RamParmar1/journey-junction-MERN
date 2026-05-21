import asyncHandler from "express-async-handler";
import Trip from "../models/Trip.js";

export const getAllTrips = asyncHandler(async (req, res) => {
  const trips = await Trip.find({}).sort({ createdAt: -1 });
  res.json(trips);
});

export const getTripById = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id);
  if (!trip) { res.status(404); throw new Error("Trip not found"); }
  res.json(trip);
});

export const createTrip = asyncHandler(async (req, res) => {
  const { name, location, price, duration, description, image, maxGroupSize } = req.body;
  if (!name || !location || !price) { res.status(400); throw new Error("Name, location and price required"); }
  const trip = await Trip.create({ name, location, price: Number(price), duration: duration||"", description: description||"", image: image||"", maxGroupSize: maxGroupSize||10 });
  res.status(201).json(trip);
});

export const updateTrip = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id);
  if (!trip) { res.status(404); throw new Error("Trip not found"); }
  const { name, location, price, duration, description, image, maxGroupSize } = req.body;
  trip.name = name ?? trip.name;
  trip.location = location ?? trip.location;
  trip.price = price ? Number(price) : trip.price;
  trip.duration = duration ?? trip.duration;
  trip.description = description ?? trip.description;
  trip.image = image ?? trip.image;
  trip.maxGroupSize = maxGroupSize ?? trip.maxGroupSize;
  const updated = await trip.save();
  res.json(updated);
});

export const deleteTrip = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id);
  if (!trip) { res.status(404); throw new Error("Trip not found"); }
  await trip.deleteOne();
  res.json({ message: "Trip deleted" });
});