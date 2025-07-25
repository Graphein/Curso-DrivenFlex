import express from "express";
import productsRouters from "./routers/products.routers.js";

const app = express();
app.use(express.json());
app.use(productsRouters);

app.listen(4000, () => {
  console.log("Server listening on port 4000.");
});
