import express from "express";
import itemsRoutes from "./routes/items.routes.js";

const app = express();
app.use(express.json());

app.use("/items", itemsRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
