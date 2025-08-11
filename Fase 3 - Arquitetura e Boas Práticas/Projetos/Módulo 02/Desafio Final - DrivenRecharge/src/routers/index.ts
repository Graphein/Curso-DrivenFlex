import { Router } from "express";

import phonesRouter from "./phones.router";
import rechargesRouter from "./recharges.router";
import summaryRouter from "./summary.router";

const router = Router();

router.use("/phones", phonesRouter);
router.use("/recharges", rechargesRouter);
router.use("/summary", summaryRouter);

export default router;
