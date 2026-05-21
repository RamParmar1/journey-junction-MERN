import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    name:         { type: String, required: true },
    location:     { type: String, required: true },
    price:        { type: Number, required: true },
    duration:     { type: String, default: "" },
    description:  { type: String, default: "" },
    image:        { type: String, default: "" },
    maxGroupSize: { type: Number, default: 10 },
  },
  { timestamps: true }
);

const Trip = mongoose.model("Trip", tripSchema);
export default Trip;