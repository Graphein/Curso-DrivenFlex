import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller";
import { validateSchema } from "../middlewares/validateSchema";
import { signInSchema, signUpSchema } from "../schemas/auth.schemas";

const authRouter = Router();
authRouter.post("/sign-up", validateSchema(signUpSchema), signUp);
authRouter.post("/sign-in", validateSchema(signInSchema), signIn);
export default authRouter;