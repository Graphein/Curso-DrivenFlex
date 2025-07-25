import { db } from "../database/db.js";

export async function findAllProducts(req, res) {
  try {
    const products = await db.query("SELECT * FROM produtos");
    res.send(products.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function createProduct(req, res) {
  const { nome, preco, condicao } = req.body;

  try {
	  const product = await db.query(`SELECT * FROM produtos WHERE nome=$1;`, [nome])
    if (product.rowCount !== 0) return res.sendStatus(409);
    
    await db.query(
      `INSERT INTO produtos (nome, preco, condicao) VALUES ($1, $2, $3);`,
      [nome, preco, condicao]
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}