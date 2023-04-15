import { IRecipe } from "../interfaces/IRecipe";
import connection from "./connection"

export default class RecipesModel {
  constructor() { }

  public async getAll(): Promise<IRecipe[] | undefined> {
    const query = `SELECT recipes.id, recipes.name, recipes.preparation,
    JSON_ARRAYAGG(ingredients.name) as 'ingredients'
    FROM cookmaster.recipes as recipes
    JOIN cookmaster.recipes_ingredients as ri ON recipes.id = ri.recipe_id
    JOIN cookmaster.ingredients as ingredients ON ri.ingredient_id = ingredients.id
    GROUP BY recipes.id
    ORDER BY recipes.id;`

    const [recipes] = await connection.execute(query);

    return recipes;
  }
}