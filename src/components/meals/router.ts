import express from "express";
import addMeal from "./addMeal";
import getMeals from "./getMeals";

const mealsRouter = express.Router();

mealsRouter.route("/meals").get(getMeals).post(addMeal);

export default mealsRouter;
