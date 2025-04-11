import express from "express";
import {
  createMeal,
  getAllMeals,
 
} from "../controller/meal.controller.js";

const router = express.Router();

router.post("/createMeal", createMeal);            
router.get("/getAllMeals", getAllMeals);    


export default router;
