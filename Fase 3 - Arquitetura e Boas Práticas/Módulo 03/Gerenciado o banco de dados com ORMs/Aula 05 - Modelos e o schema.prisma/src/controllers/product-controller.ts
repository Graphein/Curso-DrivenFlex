import { Request, Response } from "express";
import httpStatus from "http-status";

import productService from "../services/product-service";

async function getProducts(req: Request, res: Response) {
  const products = await productService.getProducts();
  res.send(products);
}

async function createProduct(req: Request, res: Response) {
  const body = req.body;
  await productService.createProduct(body);

  res.sendStatus(httpStatus.CREATED);
}

const productController = {
  getProducts,
  createProduct
}

export default productController;