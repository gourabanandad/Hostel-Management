import Meal from "../models/meal.model.js";

// Create a new meal
export const createMeal = async (req, res) => {
  try {
    const meal = new Meal(req.body);
    const savedMeal = await meal.save();
    res.status(201).json(savedMeal);
  } catch (error) {
    res.status(500).json({ message: "Failed to create meal", error });
  }
};

// Get all meals
export const getAllMeals = async (req, res) => {
  try {
    const meals = await Meal.find();
    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch meals", error });
  }
};

