import express from "express";
import verifyRoles from "src/middleware/verifyRoles";
import addMeal from "./addMeal";
import getMeals from "./getMeals";

const mealsRouter = express.Router();

mealsRouter
  .route("/meals")
  .get(getMeals)
  .post(verifyRoles(["Editor", "Admin"]), addMeal);

export default mealsRouter;
