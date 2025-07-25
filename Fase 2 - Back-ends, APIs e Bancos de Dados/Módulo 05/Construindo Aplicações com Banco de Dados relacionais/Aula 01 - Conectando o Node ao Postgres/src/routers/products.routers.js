import { Router } from "express";
import { createProduct, findAllProducts } from "../controllers/products.controllers.js";

const router = Router();

router.get("/api/products", findAllProducts);
router.post("/api/products", createProduct);

export default router;
