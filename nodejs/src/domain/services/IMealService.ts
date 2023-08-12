import { IMealRecipe } from "../entities/MealRecipe";

export interface IMealService {
  getRandomMeal(): Promise<IMealRecipe> 
}