// routes/imageRoutes.js

import express from "express";
import {
  getAllImages,
  createImage,
 
} from "../controller/image.controller.js";

const router = express.Router();

router.get("/getimages", getAllImages);
router.post("/createimages", createImage);


export default router;
