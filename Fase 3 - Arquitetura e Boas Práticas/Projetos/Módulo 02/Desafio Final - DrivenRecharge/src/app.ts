import express, { Request, Response, NextFunction } from "express";
import { handleErrors } from "./middlewares/error.middleware";
import router from "./routers/index";

const app = express();

app.use(express.json()); 

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).send({ message: "JSON malformado." });
  }
  next(err);
});

app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("I'm OK!");
});

app.use(router);

app.use(handleErrors); 

export default app;
