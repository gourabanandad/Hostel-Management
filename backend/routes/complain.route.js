import express from "express";
import {
  createComplaint,
  getAllComplaints,
} from "../controller/complain.controller.js";

const router = express.Router();

router.post("/createcomplain", createComplaint);         // Create new complaint
router.get("/getcomplains", getAllComplaints);         // Get all complaints

export default router;
