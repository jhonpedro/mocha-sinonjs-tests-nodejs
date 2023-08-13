import { IMealRecipe } from "../../domain/entities/MealRecipe";
import axios from "axios";
import { IMealService } from "../../domain/services/IMealService";

// i did this because I wanted to integrate with their API for some tests hehe
export interface IMealPHPResponse {
  meals: { [key: string]: null | string }[];
}

export class MealService implements IMealService {
  async getRandomMeal(): Promise<IMealRecipe> {
    const response = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    // const response = {
    //   meals: [
    //     {
    //       idMeal: "53070",
    //       strMeal: "Beef Caldereta",
    //       strCategory: "Beef",
    //       strArea: "Filipino",
    //       strInstructions:
    //         "0.\tHeat oil in a cooking pot. Saute onion and garlic until onion softens\r\n1.\tAdd beef. Saute until the outer part turns light brown.\r\n2.\tAdd soy sauce. Pour tomato sauce and water. Let boil.\r\n3.\tAdd Knorr Beef Cube. Cover the pressure cooker. Cook for 30 minutes.\r\n4.\tPan-fry carrot and potato until it browns. Set aside.\r\n5.\tAdd chili pepper, liver spread and peanut butter. Stir.\r\n6.\tAdd bell peppers, fried potato and carrot. Cover the pot. Continue cooking for 5 to 7 minutes.\r\n7.\tSeason with salt and ground black pepper. Serve.\r\n",
    //       strMealThumb:
    //         "https://www.themealdb.com/images/media/meals/41cxjh1683207682.jpg",
    //       strYoutube: "https://www.youtube.com/watch?v=yI7hTz0ft5k",
    //       strIngredient1: "Beef",
    //       strIngredient2: "Beef Stock",
    //       strIngredient3: "Soy Sauce",
    //       strIngredient4: "Water",
    //       strIngredient5: "Green Pepper",
    //       strIngredient6: "Red Pepper",
    //       strIngredient7: "Potatoes",
    //       strIngredient8: "Carrots",
    //       strIngredient9: "Tomato Puree",
    //       strIngredient10: "Peanut Butter",
    //       strIngredient11: "Chilli Powder",
    //       strIngredient12: "Onion",
    //       strIngredient13: "Garlic",
    //       strIngredient14: "Olive Oil",
    //       strIngredient15: "",
    //       strIngredient16: "",
    //       strIngredient17: "",
    //       strIngredient18: "",
    //       strIngredient19: "",
    //       strIngredient20: "",
    //       strMeasure1: "2kg cut cubes",
    //       strMeasure2: "1",
    //       strMeasure3: "1 tbs",
    //       strMeasure4: "2 cups ",
    //       strMeasure5: "1 sliced",
    //       strMeasure6: "1 sliced",
    //       strMeasure7: "1 sliced",
    //       strMeasure8: "1 sliced",
    //       strMeasure9: "8 ounces",
    //       strMeasure10: "3  tablespoons",
    //       strMeasure11: "5",
    //       strMeasure12: "1 chopped",
    //       strMeasure13: "5 cloves",
    //       strMeasure14: "3 tbs",
    //       strMeasure15: " ",
    //       strMeasure16: " ",
    //       strMeasure17: " ",
    //       strMeasure18: " ",
    //       strMeasure19: " ",
    //       strMeasure20: " ",
    //       strSource: "https://www.kawalingpinoy.com/beef-caldereta/",
    //     },
    //   ],
    // };

    const meal = response.data.meals[0];
    const measureArr = this.formatTheMealDb(meal, "strMeasure");
    const mealRecipe: IMealRecipe = {
      name: meal.strMeal,
      instructions: meal.strInstructions,
      ingredients: this.formatTheMealDb(meal, "strIngredient").map(
        (ing, index) => ({ name: ing, measure: measureArr[index] })
      ),
    };

    return mealRecipe;
  }

  private formatTheMealDb(
    obj: { [key: string]: null | string },
    key: string
  ): string[] {
    const result = [];
    for (let i = 1; obj[key + i] && obj[key + i] != ""; i++) {
      result.push(obj[key + i]);
    }
    return result;
  }
}

(async () => {
  const x = await new MealService().getRandomMeal();

  console.dir(x, { depth: null });
})();
