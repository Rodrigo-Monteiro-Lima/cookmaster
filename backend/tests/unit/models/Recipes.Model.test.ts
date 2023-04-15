import * as sinon from 'sinon';
import * as chai from 'chai';
import { describe } from 'mocha';
import { allRecipes, allRecipesDbResponse } from '../../mocks/recipes.mock';
import connection from '../../../src/models/connection';
import RecipesModel from '../../../src/models/Recipes.Model';

const { expect } = chai;

const recipesModel = new RecipesModel();

describe('Model GET /recipes', () => {
  describe('Success cases', () => {
    before(() => {
      sinon.stub(connection, "execute").resolves(allRecipesDbResponse);
    });
    after(() => {
      sinon.restore();
    });
    it('return a array', async () => {
      const recipes = await recipesModel.getAll();
      expect(recipes).to.be.a('array');
    });
    it('return all recipes', async () => {
      const recipes = await recipesModel.getAll();
      expect(recipes).to.be.deep.equal(allRecipes);
    });
  });
  describe('Failure cases', () => {
    before(() => {
      sinon.stub(connection, "execute").resolves([]);
    });
    after(() => {
      sinon.restore();
    });
    it('return a undefined', async () => {
      const recipes = await recipesModel.getAll();
      expect(recipes).to.be.undefined;
    });
  });
});