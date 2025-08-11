import db from "../config/database";
import type { Recharge } from "../protocols/recharge.protocol";

export async function insertRecharge(data: {
  phoneId: number;
  value: number;
}): Promise<Recharge> {
  const result = await db.query(
    `
    INSERT INTO recharges (phone_id, value)
    VALUES ($1, $2)
    RETURNING *;
    `,
    [data.phoneId, data.value]
  );

  return result.rows[0];
}

export async function findByPhoneId(phoneId: number): Promise<Recharge[]> {
  const result = await db.query(
    `
    SELECT * FROM recharges
    WHERE phone_id = $1
    ORDER BY timestamp DESC;
    `,
    [phoneId]
  );

  return result.rows;
}
const rechargesRepository = {
  insertRecharge,
  findByPhoneId
};

export default rechargesRepository;