import { Router } from 'express';
import RecipesController from '../controllers/Recipes.Controller';
import RecipesModel from '../models/Recipes.Model';
import RecipesService from '../services/Recipes.Service';

const router = Router();

const recipesModel = new RecipesModel();
const recipesService = new RecipesService(recipesModel);
const recipesController = new RecipesController(recipesService)

router.get('/recipes', recipesController.getAll);

export default router;