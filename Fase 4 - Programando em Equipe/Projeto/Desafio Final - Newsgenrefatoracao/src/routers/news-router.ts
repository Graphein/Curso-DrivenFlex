import Router from "express";

import * as newsController from "./../controllers/news-controller";
import { validateSchemaMiddleware } from "../middlewares/schema-handler";
import { newsSchema } from "../schemas/news-schema";

const newsRouter = Router();

newsRouter.get("/", newsController.getNews);
newsRouter.get("/:id", newsController.getNewsById);
newsRouter.post("/", validateSchemaMiddleware(newsSchema), newsController.createNews);
newsRouter.put("/:id", validateSchemaMiddleware(newsSchema), newsController.updateNews);
newsRouter.delete("/:id", newsController.deleteNews);

export default newsRouter;
