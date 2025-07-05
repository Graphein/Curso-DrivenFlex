import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.DATABASE_URL);
let db;

try {
  await client.connect();
  db = client.db(); // usa o nome do banco que está na connection string
  console.log('✅ Conectado ao MongoDB');
} catch (err) {
  console.error('❌ Erro ao conectar no MongoDB:', err);
}

export default db;
