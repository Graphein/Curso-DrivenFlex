import express, { json, Request, Response } from "express";
import "express-async-errors";
import dotenv from "dotenv";
import httpStatus from "http-status";

import errorHandlerMiddleware from "./middlewares/error-middleware";
import milesRouter from "./routers/miles-router";

dotenv.config();

const app = express();
app.use(json());

app.get("/health", (req: Request, res: Response) => res.status(httpStatus.OK).send(`I'm okay!`));
app.use(milesRouter);
app.use(errorHandlerMiddleware);

export default app;