import mongoose from "mongoose";

const mealSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mealType: { type: String, required: true },
    takeMeal:{
        type: Boolean,
        default: false,
    }
  },
  { timestamps: true }
);

export default mongoose.model("meal", mealSchema);
