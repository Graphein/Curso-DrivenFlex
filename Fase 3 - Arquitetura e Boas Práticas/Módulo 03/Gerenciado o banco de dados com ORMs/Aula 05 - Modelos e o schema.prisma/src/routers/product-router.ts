import { Router } from "express";

import productController from "../controllers/product-controller";
import { productSchema } from "../schemas/product-schema";
import { validateSchemaMiddleware } from "../middlewares/schema-middleware";

const productsRouter = Router();

productsRouter.get("/products", productController.getProducts);
productsRouter.post("/products", validateSchemaMiddleware(productSchema), productController.createProduct);

export default productsRouter;