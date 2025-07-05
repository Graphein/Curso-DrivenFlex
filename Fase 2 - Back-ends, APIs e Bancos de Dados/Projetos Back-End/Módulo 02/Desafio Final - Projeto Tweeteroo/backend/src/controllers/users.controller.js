import db from '../database/mongoClient.js';

export async function signUp(req, res) {
  const { username, avatar } = req.body;

  try {
    await db.collection('users').insertOne({ username, avatar });
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send('Erro ao cadastrar usuário');
  }
}
