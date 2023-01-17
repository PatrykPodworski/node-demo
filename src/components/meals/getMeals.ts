import { RequestHandler } from "express";
import Meal, { meals } from "./Meal";

const getMeals: RequestHandler<undefined, Response> = (_req, res) => {
  res.status(200).json(meals);
};

type Response = Meal[];

export default getMeals;