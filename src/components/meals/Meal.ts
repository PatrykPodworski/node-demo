import { randomUUID } from "crypto";

type Meal = {
  id: string;
  name: string;
};

export let meals: Meal[] = [
  { id: randomUUID(), name: "Ragu" },
  { id: randomUUID(), name: "Chili con carne" },
];

export const setMeals = (newMeals: Meal[]) => (meals = newMeals);

export default Meal;
