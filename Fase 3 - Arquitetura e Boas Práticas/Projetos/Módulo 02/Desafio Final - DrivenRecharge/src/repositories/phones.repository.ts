import db from "../config/database";
import type { Phone } from "../protocols/phone.protocol";

export async function findByNumber(number: string): Promise<Phone | null> {
  const result = await db.query(
    `SELECT * FROM phones WHERE number = $1`,
    [number]
  );
  return result.rows[0] || null;
}

export async function findById(id: number): Promise<Phone | null> {
  const result = await db.query(
    `SELECT * FROM phones WHERE id = $1`,
    [id]
  );
  return result.rows[0] || null;
}

export async function countPhonesByDocument(document: string): Promise<number> {
  const result = await db.query(`
    SELECT COUNT(p.*) FROM phones p
    JOIN clients c ON p.client_id = c.id
    WHERE c.document = $1
  `, [document]);

  return Number(result.rows[0].count);
}

export async function insertPhone(data: {
  number: string;
  description: string;
  carrierId: number;
  clientId: number;
}): Promise<Phone> {
  const result = await db.query(
    `
    INSERT INTO phones (number, description, carrier_id, client_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `,
    [data.number, data.description, data.carrierId, data.clientId]
  );

  return result.rows[0];
}

export async function findPhonesByDocument(document: string): Promise<Phone[]> {
  const result = await db.query(
    `
    SELECT p.* FROM phones p
    JOIN clients c ON p.client_id = c.id
    WHERE c.document = $1
    `,
    [document]
  );

  return result.rows;
}
const phonesRepository = {
  findByNumber,
  findById,
  countPhonesByDocument,
  insertPhone,
  findPhonesByDocument
};

export default phonesRepository;