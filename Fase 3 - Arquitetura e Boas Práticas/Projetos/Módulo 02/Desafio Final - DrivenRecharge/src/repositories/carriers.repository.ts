import db from "../config/database";
import type { Carrier } from "../protocols/carrier.protocol";

export async function findById(id: number): Promise<Carrier | null> {
  const result = await db.query(`
    SELECT * FROM carriers WHERE id = $1
  `, [id]);

  return result.rows[0] || null;
}
const carriersRepository = {
  findById
};

export default carriersRepository;