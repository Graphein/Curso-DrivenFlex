import productRepository from "../repositories/product-repository";

async function getProducts() {
  const products = await productRepository.getProducts();
  return products;
}

async function getProduct(id: number) {
  const product = await productRepository.getProduct(id);
  if (!product) throw {
    name: "NotFoundError",
    message: "Post not found"
  };

  return product;
}

async function createProduct(post) {
  return await productRepository.createProduct(post);
}

const postService = {
  getProducts,
  createProduct
}

export default postService;