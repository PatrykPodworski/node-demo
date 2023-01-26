import { model, Schema, Types } from "mongoose";

type MealSchema = {
  name: string;
  ingredients: IngredientSchema[];
};

export type MealType = MealSchema & {
  _id: Types.ObjectId;
};

export type IngredientSchema = {
  name: string;
  amount: number;
  unit: string;
};

const ingredientSchema = new Schema<IngredientSchema>({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
});

const mealSchema = new Schema<MealSchema>({
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [ingredientSchema],
    default: [],
  },
});

const Meal = model("Meal", mealSchema);

export default Meal;
