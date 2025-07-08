import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid'
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;
mongoClient.connect(() => {
  db = mongoClient.db("cadastra-ai-v2");
});

const app = express();
app.use(express.json());

app.post("/sign-up", async (req, res) => {
  const {name, email, password} = req.body;

  const passwordHash = bcrypt.hashSync(password, 10);

  await db.collection('users').insertOne({ name, email, password: passwordHash })

  res.sendStatus(201);
});

app.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;
  try 
  {
    const user = await db.collection('users').findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) 
      {
      const token = uuid()
      await db.collection('sessions').insertOne({ token, userId: user._id })
      res.send(token)
      } 
      else 
      {
      res.sendStatus(401);
      }
  }
  catch (error) 
  {
    res.status(500).send(err.message)
  }

});

app.get("/meus-dados", async (req, res) => {
  // Receba um token pelo header Authorization
  const { authorization } = req.headers
  const token = authorization?.replace("Bearer ", "")

  // Caso não seja enviado o token ou não encontrado, retorne status 401
  if (!token) return res.sendStatus(401)

  try {
    const session = await db.collection('sessions').findOne({ token })
    if (!session) return res.sendStatus(401)

    const user = await db.collection('users').findOne({ _id: session.userId })
    if (!user) return res.sendStatus(401)

    delete user.password
    // Retorne o usuário logado (objeto contendo id, nome e email)
    res.send(user)
  } catch (err) {
    res.status(500).send(err.message)
  }
});
app.listen(5000, () => {
  console.log('Server is listening on port 5000.');
});
