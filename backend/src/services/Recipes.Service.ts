import RecipesModel from "../models/Recipes.Model";

export default class RecipesService {
  #model: RecipesModel;

  constructor(model: RecipesModel) {
    this.#model = model;
  }

  getAll = async () => {
    const recipes = await this.#model.getAll();
    if (!recipes) throw new Error('NoRecipesFound');
    return recipes;
  }
}