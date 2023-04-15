import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export enum ErrorTypes {
  NoRecipesFound = 'NoRecipesFound',
}

export enum httpCodesCatalog {
  notFound = 404,
  internalServerError = 500,
}

export type ErrorResponseObject = {
  message: string;
  httpStatus: number;
}

export type ErroCatalog = {
  [key in ErrorTypes]: ErrorResponseObject
}

export const errorCatalog: ErroCatalog = {
  NoRecipesFound: {
    message: 'No recipes found',
    httpStatus: httpCodesCatalog.notFound,
  }
}

const errorMiddleware: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const messageAsErrorType = err.message as keyof typeof ErrorTypes;
  const mappedError = errorCatalog[messageAsErrorType];
  if (mappedError) {
    const { httpStatus, message } = mappedError;
    return res.status(httpStatus).json({ message })
  }
  return res.status(httpCodesCatalog.internalServerError).json({ message: 'Internal Server Error' });
}

export default errorMiddleware;