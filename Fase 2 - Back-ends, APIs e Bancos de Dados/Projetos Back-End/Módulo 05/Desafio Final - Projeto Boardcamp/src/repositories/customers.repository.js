import { db } from "../database/db.js";

export function findByCpf(cpf) {
  return db.query(`SELECT * FROM customers WHERE cpf = $1`, [cpf]);
}

export function insert({ name, phone, cpf }) {
  return db.query(
    `INSERT INTO customers (name, phone, cpf) VALUES ($1, $2, $3)`,
    [name, phone, cpf]
  );
}

export function findAll() {
  return db.query(`SELECT * FROM customers`);
}

export function findById(id) {
  return db.query(`SELECT * FROM customers WHERE id = $1`, [id]);
}
export function update(id, { name, phone, cpf }) {
  return db.query(
    `UPDATE customers SET name = $1, phone = $2, cpf = $3 WHERE id = $4`,
    [name, phone, cpf, id]
  );
}