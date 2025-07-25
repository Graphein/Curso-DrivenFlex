import { productsService } from "../services/products.services.js";

export async function findAllProducts(req, res) {
  try {
    const products = await productsService.findAllProducts()
    res.send(products);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function createProduct(req, res) {
  const { nome, preco, condicao } = req.body;

  try {
    const product = await productsService.createProduct(nome, preco, condicao);
    if (product === null) return res.sendStatus(409);
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}