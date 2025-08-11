import { Router } from "express";
import summaryController from "../controllers/summary.controller";

const router = Router();

router.get("/:document", summaryController.getSummary);

export default router;
