import { Router } from "express";
import rechargesController from "../controllers/recharges.controller";
import { validateBody } from "../middlewares/validation.middleware";
import { rechargeSchema } from "../schemas/recharge.schema";

const router = Router();

router.post("/", validateBody(rechargeSchema), rechargesController.createRecharge);
router.get("/:number", rechargesController.getRechargesByNumber);

export default router;
