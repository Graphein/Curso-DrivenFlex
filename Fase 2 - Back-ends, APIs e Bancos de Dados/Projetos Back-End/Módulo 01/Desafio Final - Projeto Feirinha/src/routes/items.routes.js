import { Router } from "express";
import {
  createItem,
  getAllItems,
  getItemById
} from "../controllers/items.controller.js";

const router = Router();

router.post("/", createItem);
router.get("/", getAllItems);
router.get("/:id", getItemById);

export default router;
