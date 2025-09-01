import { Router } from "express";
import { auth } from "../middlewares/auth";
import { validateSchema } from "../middlewares/validateSchema";
import { credentialCreateSchema, credentialUpdateSchema } from "../schemas/credentials.schemas";
import {
  createCredential, listCredentials, getCredential, updateCredential, deleteCredential, eraseAll
} from "../controllers/credentials.controller";

const credentialsRouter = Router();
credentialsRouter.use(auth);
credentialsRouter.post("/", validateSchema(credentialCreateSchema), createCredential);
credentialsRouter.get("/", listCredentials);

credentialsRouter.delete("/erase", eraseAll);

credentialsRouter.get("/:id", getCredential);
credentialsRouter.put("/:id", validateSchema(credentialUpdateSchema), updateCredential);
credentialsRouter.delete("/:id", deleteCredential);

export default credentialsRouter;