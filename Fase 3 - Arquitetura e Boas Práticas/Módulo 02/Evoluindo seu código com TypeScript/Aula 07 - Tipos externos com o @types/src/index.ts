import express from 'express';
import type { Request, Response } from 'express';

const app = express();

app.get("/health", (req: Request, res: Response) => res.status(200).send("I'm Ok!"));
app.get("/today", (req: Request, res: Response) => {
  res.send({
    today: new Date().toLocaleDateString("pt-br")
  });
});

const port = 5000;
app.listen(port, () => console.log(`Server is up and running on port ${port}`));
