import { IngredientSchema, MealType } from "../data/Meal";
import ApiIngredient from "./ApiIngredient";
import { ApiMeal } from "./ApiMeal";

export const toApiMeal = (meal: MealType): ApiMeal => ({
  id: meal._id.toString(),
  name: meal.name,
  ingredients: meal.ingredients.map(toApiIngredient),
});

export const toApiIngredient = (
  ingredient: IngredientSchema
): ApiIngredient => ({
  name: ingredient.name,
  amount: ingredient.amount,
  unit: ingredient.unit,
});
