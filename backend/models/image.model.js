import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  title: { type: String, required: true },

  description: { type: String, required: true },
  imageUrl: { type: String, required: true },

  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model("Images", imageSchema);
