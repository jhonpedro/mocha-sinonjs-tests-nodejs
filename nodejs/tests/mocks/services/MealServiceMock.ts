import { IMealRecipe } from "../../../src/domain/entities/MealRecipe";
import { IMealService } from "../../../src/domain/services/IMealService";

export const getRandomMealBaseReturn: IMealRecipe = {
  name: "Mock",
  ingredients: [{ name: "Mock", measure: "1" }],
  instructions: 'Mock'
}

export class MealServiceMock implements IMealService {
  async getRandomMeal(): Promise<IMealRecipe> {
    return getRandomMealBaseReturn;
  }
}
