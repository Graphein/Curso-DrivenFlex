import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.MODE === "PROD" ? { rejectUnauthorized: false } : false,
});

export default connection;
