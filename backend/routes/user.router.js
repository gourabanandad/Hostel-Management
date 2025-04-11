import express from 'express';
import { registerUser,getAllStudents,updateStudentStatus  } from '../controller/user.controller.js';

const router = express.Router();

// POST /api/users/register

router.post("/register", registerUser);
router.get("/students", getAllStudents);
router.patch("/:id/status", async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      if (!["present", "absent"].includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
      }
  
      const updatedStudent = await Student.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
  
      if (!updatedStudent) {
        return res.status(404).json({ error: "Student not found" });
      }
  
      res.json(updatedStudent);
    } catch (err) {
      console.error("Error updating status:", err);
      res.status(500).json({ error: "Server error" });
    }
  });
  

export default router;