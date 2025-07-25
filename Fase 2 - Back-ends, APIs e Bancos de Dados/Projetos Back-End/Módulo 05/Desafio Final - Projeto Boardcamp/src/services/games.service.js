import * as gamesRepository from "../repositories/games.repository.js";
import ConflictError from "../errors/ConflictError.js";

export async function createGame(game) {
  const existing = await gamesRepository.findByName(game.name);
  if (existing.rowCount > 0) throw new ConflictError("Jogo existe");
  await gamesRepository.insert(game);
}

export async function getGames() {
  const { rows } = await gamesRepository.findAll();
  return rows;
}
