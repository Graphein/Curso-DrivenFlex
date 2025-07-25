import { Router } from "express";
import { createGame, getGames } from "../controllers/games.controller.js";
import validateSchema from "../middlewares/validateSchema.js";
import { gameSchema } from "../schemas/games.schema.js";

const gamesRouter = Router();

gamesRouter.post("/games", validateSchema(gameSchema), createGame);
gamesRouter.get("/games", getGames);

export default gamesRouter;
