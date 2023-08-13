import { IMealRecipe } from "../entities/MealRecipe";
import { IMealService } from "../services/IMealService";

enum RandomMealChoice {
  ReallyGood = "ReallyGood",
  Good = "Good",
  Average = "Average",
}

export class GetRandomMealUseCase {
  private userFavorites = ["potatoes", "beef"];

  constructor(private mealSerice: IMealService) {}

  async execute(): Promise<
    [Error, { recipe: IMealRecipe; choiceLevel: RandomMealChoice }]
  > {
    const meal = await this.mealSerice.getRandomMeal();

    const howManyMealTheUserLikes = meal.ingredients.filter(({ name }) =>
      this.userFavorites.includes(name.toLocaleLowerCase())
    ).length;

    const result = { recipe: meal, choiceLevel: RandomMealChoice.Average };

    if (howManyMealTheUserLikes > 2) {
      result.choiceLevel = RandomMealChoice.ReallyGood;
    } else if (howManyMealTheUserLikes > 1) {
      result.choiceLevel = RandomMealChoice.Good;
    }

    return [null, result];
  }
}
