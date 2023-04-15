import { RequestHandler } from "express";
import RecipesService from "../services/Recipes.Service";

export default class RecipesController {
  #service: RecipesService;

  constructor(service: RecipesService) {
    this.#service = service;
  }

  getAll: RequestHandler = async (_req, res, next) => {
    try {
      const recipes = await this.#service.getAll()
      return res.status(200).json(recipes);
    } catch (err) {
      const { message } = err as Error;
      next({ message });
    }
  };
}