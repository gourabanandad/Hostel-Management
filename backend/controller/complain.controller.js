import Complaint from "../models/complains.model.js";

// @desc    Create a new complaint
// @route   POST /api/complaints/createcomplain
export const createComplaint = async (req, res) => {
  try {
    const { name, roll, room, complaintType, complaint_desc } = req.body;

    if (!name || !roll || !room || !complaintType || !complaint_desc) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const complaint = await Complaint.create({
      name,
      roll,
      room,
      complaintType,
      complaint_desc,
    });

    res.status(201).json(complaint);
  } catch (error) {
    console.error("Error creating complaint:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get all complaints
// @route   GET /api/complaints/getcomplains
export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
