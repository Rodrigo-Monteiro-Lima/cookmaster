import express, { Request, Response } from 'express';
import errorMiddleware from './middlewares/error.middleware';
import recipesRouter from './routers/Recipes.Router';

const app = express();

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.status(200).send('OK');
});

app.use(recipesRouter);

app.use(errorMiddleware);

export default app;