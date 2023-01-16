import { randomUUID } from "crypto";
import RequestHandler from "../common/RequestHandler";
import Meal, { meals, setMeals } from "./Meal";

const addMeal: RequestHandler<Request, Response> = (req, res) => {
  const name = req.body.name;
  if (!name) {
    return res.sendStatus(400);
  }

  const meal = {
    id: randomUUID(),
    name,
  };

  setMeals([...meals, meal]);

  return res.status(201).json(meal);
};

type Request = Omit<Meal, "id">;

type Response = Meal;

export default addMeal;
