import { Router } from "express";
import { createProduct, findAllProducts } from "../controllers/products.controllers.js";

const router = Router();

router.get("/", findAllProducts);
router.post("/", createProduct);

export default router;
