import express from "express";

const app = express();
app.use(express.json());

app.post("/tasks", (req, res) => {
    tasks.push(req.body);
    res.send(req.body);
  })

  app.get("/tasks", (req, res) => {
    res.send(tasks);
  })

  const PORT = 5005;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
