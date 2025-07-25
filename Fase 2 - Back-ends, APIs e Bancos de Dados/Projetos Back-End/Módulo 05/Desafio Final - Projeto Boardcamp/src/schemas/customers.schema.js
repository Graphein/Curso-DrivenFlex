import Joi from "joi";

export const customerSchema = Joi.object({
  name: Joi.string().trim().required(),
  phone: Joi.string().pattern(/^[0-9]{10,11}$/).required(),
  cpf: Joi.string().length(11).pattern(/^[0-9]+$/).required()
});
