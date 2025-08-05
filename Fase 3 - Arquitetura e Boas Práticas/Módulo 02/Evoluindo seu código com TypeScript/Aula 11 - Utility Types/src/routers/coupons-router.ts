import { Router } from "express";
import { createCoupons, getCoupons } from "../controllers/coupons-controller";

const couponsRouter = Router();

couponsRouter.get("/coupons", getCoupons);
couponsRouter.post("/coupons", createCoupons);

export default couponsRouter;