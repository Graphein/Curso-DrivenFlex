import { Router } from "express";

import postController from "../controllers/post-controller";
import { postSchema } from "../schemas/post-schema";
import { validateSchemaMiddleware } from "../middlewares/schema-middleware";

const postsRouter = Router();

postsRouter.get("/posts", postController.getPosts);
postsRouter.post("/posts", validateSchemaMiddleware(postSchema), postController.createPost);
postsRouter.delete("/posts/:id", postController.deletePost);

export default postsRouter;