import { Router } from "express";
import authRouter from "./auth.router";
import credentialsRouter from "./credentials.router";

const router = Router();
router.use(authRouter);
router.use("/credentials", credentialsRouter);

router.delete("/erase", credentialsRouter); 

export default router;