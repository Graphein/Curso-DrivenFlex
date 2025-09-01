import express, { Request, Response, json } from "express";

import dotenv from "dotenv";
import prisma from "./database/database";
import { validateSchemaMiddleware } from "./middlewares/schema-middleware";
import { Favorite } from "@prisma/client";
import { favoriteSchema } from "../schemas/favorite-schema";

dotenv.config();

const app = express();
app.use(json());

type CreateFavorite = Omit<Favorite, "id">;

app.get("/favorites", async (req: Request, res: Response) => {
  try {
    const favorites = await prisma.favorite.findMany();
    res.send(favorites);
  } catch (error) {
    console.log(error)
    res.sendStatus(500);
  }
});

app.post("/favorites", validateSchemaMiddleware(favoriteSchema), async (req: Request, res: Response) => {
  try {
    const body = req.body as CreateFavorite;
    const favorite = await prisma.favorite.create({
      data: body
    });

    res.status(201).send(favorite);
  } catch (error) {
    console.log(error)
    res.sendStatus(500);
  }

});

const port = Number(process.env.PORT) || 5000;
app.listen(port, () => console.log(`Server is up and running on port ${port}`));