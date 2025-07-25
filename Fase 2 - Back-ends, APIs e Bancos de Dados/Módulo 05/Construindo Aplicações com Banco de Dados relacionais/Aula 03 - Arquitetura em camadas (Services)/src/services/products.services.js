import { db } from "../database/db.js";

export async function findAllProducts() {
    const products = await db.query("SELECT * FROM produtos");
    return products.rows;
}

export async function createProduct(nome, preco, condicao) {
    const product = await db.query(`SELECT * FROM produtos WHERE nome=$1;`, [nome])
    if (product.rowCount !== 0) return null;

    const newProduct = await db.query(
      `INSERT INTO produtos (nome, preco, condicao) VALUES ($1, $2, $3);`,
      [nome, preco, condicao]
    );
    return newProduct.rows;
}

export const productsService = {
    findAllProducts,
    createProduct
};