// controllers/imageController.js

import { User as Image } from "../models/image.model.js"; // Adjust path as needed

// Get all images
export const getAllImages = async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch images." });
  }
};



// Create a new image
export const createImage = async (req, res) => {
  const { title, description, imageUrl } = req.body;
  try {
    const newImage = new Image({ title, description, imageUrl });
    await newImage.save();
    res.status(201).json(newImage);
  } catch (error) {
    res.status(400).json({ error: "Failed to create image." });
  }
};



