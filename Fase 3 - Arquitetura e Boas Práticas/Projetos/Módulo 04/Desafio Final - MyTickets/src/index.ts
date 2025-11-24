import "dotenv/config";
import express, { json, Request, Response } from "express";
import "express-async-errors";
import httpStatus from "http-status";
import errorHandlerMiddleware from "./middlewares/error-middleware";
import eventsRouter from "./routers/events-router";
import ticketsRouter from "./routers/tickets-router";

const app = express();
app.use(json());

app.get("/health", (req: Request, res: Response) =>
  res.status(httpStatus.OK).send(`I'm okay!`)
);
app.use(ticketsRouter);
app.use(eventsRouter);
app.use(errorHandlerMiddleware);

export default app;
