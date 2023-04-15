import * as sinon from 'sinon';
import * as chai from 'chai';
import { describe } from 'mocha';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';
import { NextFunction, Request, Response } from 'express';
import errorMiddleware from '../../../src/middlewares/error.middleware';

chai.use(chaiAsPromised);
chai.use(sinonChai);

const { expect } = chai;

describe('Error middleware', () => {
  const request = {} as Request;
  const response = {} as Response;
  response.status = sinon.stub().returns(response);
  response.json = sinon.stub().returns(response);
  const nextFunction = sinon.spy() as NextFunction;
  describe('when called with the error "NoRecipesFound"', () => {
    it('return status 404', async () => {
      await errorMiddleware({ message: "NoRecipesFound" }, request, response, nextFunction);
      expect(response.status).to.have.been.calledWith(404);
    });
    it('return message "No recipes found"', async () => {
      await errorMiddleware({ message: "NoRecipesFound" }, request, response, nextFunction);
      expect(response.json).to.have.been.calledWith({
        message: 'No recipes found',
      });
    });
  });
  describe('when called with a not mapped error', () => {
    it('return status 500', async () => {
      await errorMiddleware({ message: "Any error" }, request, response, nextFunction);
      expect(response.status).to.have.been.calledWith(500);
    });
    it('return message "Internal Server Error"', async () => {
      await errorMiddleware({ message: "Any error" }, request, response, nextFunction);
      expect(response.json).to.have.been.calledWith({
        message: 'Internal Server Error',
      });
    });
  });
})