import express, { json } from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';

const server = express();

// configs
server.use(cors());
server.use(json());

const mongoClient = new MongoClient("mongodb://localhost:27017/test")
let db

mongoClient.connect().then(() => db = mongoClient.db("dbExercicios"))

server.get('/contatos', (req, res) => {
  const promise = db.collection("contatos").find({}).toArray();
  promise.then(contatos => res.send(contatos));
  promise.catch((err) => res.status(500).send(err.message));
});

server.post('/contatos', (req, res) => {
	const { nome, telefone } = req.body
  if (!nome || !telefone) {
    res.status(422).send("Todos os campos são obrigatórios!");
    return;
  }

  // escreva seu código aqui
  const promise = db.collection("contatos").insertOne({nome, telefone});
  promise.then(() => res.sendStatus(201));
  promise.catch(() => res.sendStatus(500));
})

server.listen(5000, () => {
  console.log("Rodando em http://localhost:5000");
});