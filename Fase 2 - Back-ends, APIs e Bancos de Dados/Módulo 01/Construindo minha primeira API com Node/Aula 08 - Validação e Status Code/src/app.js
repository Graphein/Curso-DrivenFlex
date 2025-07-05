import express, { json } from 'express';
import cors from 'cors';

const server = express();
server.use(cors());
server.use(json());

const receitas = [
  {
    id: 1,
    titulo: "Pão com Ovo",
    ingredientes: "Ovo e pão",
    preparo: "Frite o ovo e coloque no pão",
    views: 0,
  },
  {
    id: 2,
    titulo: "Bolo",
    ingredientes: "Ovo e pão",
    preparo: "Frite o ovo e coloque no pão",
    views: 0,
  }
];

server.get('/receitas', (req, res) => {
  res.send(receitas);
});

server.get('/receitas/:idDaReceita', (req, res) => {
  const receitaFiltrada = receitas.find(receita => receita.id === parseInt(req.params.idDaReceita));

  if (!receitaFiltrada) {
    res.sendStatus(404);
    return;
  }

  receitaFiltrada.views++;
  res.send(receitaFiltrada);
});

server.post('/receitas', (req, res) => {
  const { titulo, ingredientes, preparo } = req.body;

  if (receitas.find(receita => receita.titulo === titulo)) {
    res.status(409).send("Receita já existente");
    return;
  }

  if (!titulo || !ingredientes || !preparo) {
    res.status(422).send("Todos os campos são obrigatórios");
    return;
  }

  receitas.push({ id: receitas.length + 1, titulo, ingredientes, preparo, views: 0 });
  res.sendStatus(201);
});

server.listen(5005, () => {
  console.log("Rodando em http://localhost:5005");
});