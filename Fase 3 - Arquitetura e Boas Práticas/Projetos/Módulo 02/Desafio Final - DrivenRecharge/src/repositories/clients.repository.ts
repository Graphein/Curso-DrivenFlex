import db from "../config/database";
import type { Client } from "../protocols/client.protocol";

export async function findByDocument(document: string): Promise<Client | null> {
  const result = await db.query(
    `SELECT * FROM clients WHERE document = $1`,
    [document]
  );

  return result.rows[0] || null;
}

export async function insertClient(data: {
  name: string;
  document: string;
}): Promise<Client> {
  const result = await db.query(
    `
    INSERT INTO clients (name, document)
    VALUES ($1, $2)
    RETURNING *;
    `,
    [data.name, data.document]
  );

  return result.rows[0];
}
const clientsRepository = {
  findByDocument,
  insertClient
};

export default clientsRepository;