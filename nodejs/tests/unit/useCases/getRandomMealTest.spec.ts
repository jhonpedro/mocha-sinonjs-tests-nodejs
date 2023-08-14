import {
  GetRandomMealUseCase,
  RandomMealChoice,
} from "../../../src/domain/useCases/getRandomMeal";
import {
  MealServiceMock,
  getRandomMealBaseReturn,
} from "../../mocks/services/MealServiceMock";
import assert from "assert";
import { stub } from "sinon";

describe("GetRandomMeal service tests", () => {
  it("Should return a random meal sucessfuly with average meal choice", async () => {
    const useCase = new GetRandomMealUseCase(new MealServiceMock());

    const result = await useCase.execute();

    assert.strictEqual(result[0], null);
    assert.strictEqual(result[1].choiceLevel, RandomMealChoice.Average);
  });

  it("Should return a random meal sucessfuly with good meal choice", async () => {
    const mealService = new MealServiceMock();
    stub(mealService, "getRandomMeal").callsFake(async () => {
      return {
        ...getRandomMealBaseReturn,
        ingredients: [{ name: "potatoes", measure: "2" }],
      };
    });

    const useCase = new GetRandomMealUseCase(mealService);

    const result = await useCase.execute();

    assert.strictEqual(result[0], null);
    assert.strictEqual(result[1].choiceLevel, RandomMealChoice.Good);
  });

  it("Should return a random meal sucessfuly with really good meal choice", async () => {
    const mealService = new MealServiceMock();
    stub(mealService, "getRandomMeal").callsFake(async () => {
      return {
        ...getRandomMealBaseReturn,
        ingredients: [
          { name: "potatoes", measure: "2" },
          { name: "beef", measure: "2" },
        ],
      };
    });

    const useCase = new GetRandomMealUseCase(mealService);

    const result = await useCase.execute();

    assert.strictEqual(result[0], null);
    assert.strictEqual(result[1].choiceLevel, RandomMealChoice.ReallyGood);
  });

  it("Should return an error if service fails", async () => {
    const mealService = new MealServiceMock();
    stub(mealService, "getRandomMeal").callsFake(async () => {
      throw new Error("random error");
    });

    const useCase = new GetRandomMealUseCase(mealService);

    const result = await useCase.execute();

    assert.notEqual(result[0], null);
  });
});
