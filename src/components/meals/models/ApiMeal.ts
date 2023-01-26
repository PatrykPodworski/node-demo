import ApiIngredient from "./ApiIngredient";

export type ApiMeal = {
  id: string;
  name: string;
  ingredients: ApiIngredient[];
};

export default ApiMeal;
