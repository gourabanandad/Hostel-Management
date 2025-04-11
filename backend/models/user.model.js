import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  semester: { type: String, required: true },
  rollNo: { type: String, required: true, unique: true },
  roomNo: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  status: {
    type: String,
    enum: ["Present", "Absent"],
    default: "Present",
  },
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", userSchema);
