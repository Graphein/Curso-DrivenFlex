import { db } from "../database/db.js";

export function findByName(name) {
  return db.query("SELECT * FROM games WHERE name = $1", [name]);
}

export function insert({ name, image, stockTotal, pricePerDay }) {
  return db.query(
    `INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4)`,
    [name, image, stockTotal, pricePerDay]
  );
}

export function findAll() {
  return db.query(`SELECT * FROM games`);
}
