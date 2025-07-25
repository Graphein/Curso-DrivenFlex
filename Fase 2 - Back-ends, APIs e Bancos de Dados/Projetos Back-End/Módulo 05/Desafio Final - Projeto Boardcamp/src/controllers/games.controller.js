import * as gamesService from "../services/games.service.js";

export async function createGame(req, res, next) {
  try {
    await gamesService.createGame(req.body);
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

export async function getGames(req, res, next) {
  try {
    const games = await gamesService.getGames();
    res.status(200).send(games);
  } catch (err) {
    next(err);
  }
}
