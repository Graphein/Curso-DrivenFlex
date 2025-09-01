import { Favorite } from "@prisma/client";
import Joi from "joi";

export const favoriteSchema = Joi.object<Favorite>({
  title: Joi.string().required(),
  url: Joi.string().required()
})