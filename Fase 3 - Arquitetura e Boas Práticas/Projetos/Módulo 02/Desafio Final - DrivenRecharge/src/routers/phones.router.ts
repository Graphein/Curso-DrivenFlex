import { Router } from "express";
import phonesController from "../controllers/phones.controller";
import { validateBody } from "../middlewares/validation.middleware";
import { phoneSchema } from "../schemas/phone.schema";

const router = Router();

router.post("/", validateBody(phoneSchema), phonesController.createPhone);
router.get("/:document", phonesController.getPhonesByDocument);

export default router;