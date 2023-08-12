import { IMealRecipe } from "../entities/MealRecipe";

export class GetRandomMeal {
  async execute(): Promise<[Error, IMealRecipe]> {
    return [null, null];
  }
}
