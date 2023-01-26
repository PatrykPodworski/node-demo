import { RequestHandler } from "express";
import Meal from "./data/Meal";
import ApiMeal from "./models/ApiMeal";
import { toApiMeal } from "./models/mappers";

const getMeals: RequestHandler<{}, Response> = async (_req, res) => {
  const meals = await Meal.find().lean();
  res.status(200).json(meals.map(toApiMeal));
};

type Response = ApiMeal[];

export default getMeals;
