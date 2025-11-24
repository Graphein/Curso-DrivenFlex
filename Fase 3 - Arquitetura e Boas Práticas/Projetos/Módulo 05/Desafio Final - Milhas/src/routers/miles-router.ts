import { Router } from "express";

import { validateSchema } from "../middlewares/schema-validation";
import milesSchema from "../schemas/miles-schema";
import { generateMiles, recoverMiles } from "../controllers/miles-controller";

const milesRouter = Router();

milesRouter.get("/miles/:code", recoverMiles);
milesRouter.post("/miles", validateSchema(milesSchema), generateMiles);

export default milesRouter;