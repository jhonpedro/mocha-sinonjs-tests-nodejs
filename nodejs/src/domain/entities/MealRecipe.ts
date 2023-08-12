export interface IMealRecipe {
  name: string;
  instructions: string;
  ingredients: { name: string; measure: string }[];
}
