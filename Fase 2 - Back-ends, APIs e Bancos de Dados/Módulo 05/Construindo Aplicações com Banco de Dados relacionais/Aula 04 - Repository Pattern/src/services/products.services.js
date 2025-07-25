import { productsRepository } from "../repositories/products.repository.js";

export async function findAllProducts() {
    const products = await productsRepository.findAllProducts();
    return products;
}

export async function createProduct(nome, preco, condicao) {
    const product = await productsRepository.searchProductByName(nome);
    if (product.rowCount !== 0) return null;

    const newProduct = await productsRepository.createProduct(nome, preco, condicao);
    return newProduct;
}

export const productsService = {
    findAllProducts,
    createProduct
};