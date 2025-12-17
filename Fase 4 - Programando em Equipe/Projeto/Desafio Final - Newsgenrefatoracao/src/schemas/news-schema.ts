import joi from "joi";
import { CreateNewsDTO } from "../repositories/news-repository";

const safeString = joi
  .string()
  .trim()
  .pattern(/^[^;'"`<>]*$/, "no SQL injection characters");

export const newsSchema = joi.object<CreateNewsDTO>({
  title: safeString.max(200).required(),
  text: safeString.min(500).required(),
  author: safeString.max(100).required(),
  publicationDate: joi.string().isoDate().required(),
  firstHand: joi.boolean().optional()
});