import { User } from "../models/user.model.js";

// Create and store a new user
export const registerUser = async (req, res) => {
  try {
    const { fullName, semester, rollNo, roomNo, phone, email, clerkId } =
      req.body;

    // Validate required fields
    if (
      !fullName ||
      !semester ||
      !rollNo ||
      !roomNo ||
      !phone ||
      !email ||
      !clerkId
    ) {
      return res
        .status(400)
        .json({ error: "All fields are required for registration" });
    }

    // Optional: Check for duplicate by email or roll number
    const existingUser = await User.findOne({
      $or: [{ email }, { rollNo }, { clerkId }],
    });
    if (existingUser) {
      return res.status(409).json({ error: "User already registered" });
    }

    const newUser = new User({
      fullName,
      semester,
      rollNo,
      roomNo,
      phone,
      email,
      clerkId,
    });
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({
      error: "Failed to register user. Please try again later.",
    });
  }
};
export const getAllStudents = async (req, res) => {
  try {
    const students = await User.find();
    res.status(200).json(students);
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ error: "Failed to fetch student data" });
  }
};

export const updateStudentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["present", "absent"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ error: "Failed to update status" });
  }
};
