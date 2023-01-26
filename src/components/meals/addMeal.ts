import RequestHandler from "../common/RequestHandler";
import Meal from "./data/Meal";
import ApiMeal from "./models/ApiMeal";
import { toApiMeal } from "./models/mappers";

const addMeal: RequestHandler<Request, Response> = async (req, res) => {
  const { name, ingredients } = req.body;

  if (!name || !ingredients) {
    return res.sendStatus(400);
  }

  const meal = await Meal.create({ name: name, ingredients: ingredients });

  return res.status(201).json(toApiMeal(meal));
};

type Request = Omit<ApiMeal, "id">;

type Response = ApiMeal;

export default addMeal;
