import Joi from "joi";

export const gameSchema = Joi.object({
  name: Joi.string().trim().required(),
  image: Joi.string().uri().required(),
  stockTotal: Joi.number().integer().min(1).required(),
  pricePerDay: Joi.number().integer().min(1).required()
});
