import { Router } from "express";
import * as rentalsController from "../controllers/rentals.controller.js";

const router = Router();

router.get("/rentals", rentalsController.getAllRentals);
router.post("/rentals", rentalsController.createRental);
router.post("/rentals/:id/return", rentalsController.returnRental);
router.delete("/rentals/:id", rentalsController.deleteRental);

export default router;
