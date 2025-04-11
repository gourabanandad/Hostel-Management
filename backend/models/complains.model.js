import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    roll: {
      type: Number,
      required: true,
      // unique: true, // remove this if students can file multiple complaints
    },
    room: {
      type: String,
      required: true,
    },
    complaintType: { // fixed name
      type: String,
      required: true,
    },
    complaint_desc: { // fixed name
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Complaint", complaintSchema);
