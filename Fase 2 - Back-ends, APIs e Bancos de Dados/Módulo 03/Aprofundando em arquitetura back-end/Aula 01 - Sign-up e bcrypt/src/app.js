import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;
mongoClient.connect(() => {
  db = mongoClient.db("cadastra-ai-v2");
});

const app = express();
app.use(express.json());

app.post("/sign-up", async (req, res) => {
  //name, email, password
  const { name, email, password } = req.body;

	const hash = bcrypt.hashSync(password, 10)

  // Insira o usuário no banco, criptografando a senha com bcrypt
  try {
    await db.collection("users").insertOne({ name, email, password: hash })
    res.sendStatus(201)
  } catch (err) {
    res.status(500).send(err.message)
  }
});

app.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;

  // Busque o usuário no banco e valide a senha usando bcrypt
  try {
    const user = await db.collection("users").findOne({ email })

    if (!user) return res.sendStatus(401)
    if (!bcrypt.compareSync(password, user.password)) return res.sendStatus(401)
    res.sendStatus(200)
  } catch (err) {
    res.status(500).send(err.message)
  }
});
app.listen(5000, () => {
  console.log('Server is listening on port 5000.');
});
