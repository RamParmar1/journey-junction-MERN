import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  location: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  description: String,
  duration: {
    type: Number,
    default: 3
  },
  includes: [String],
  image: String,
  available: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export default mongoose.model("Package", packageSchema);