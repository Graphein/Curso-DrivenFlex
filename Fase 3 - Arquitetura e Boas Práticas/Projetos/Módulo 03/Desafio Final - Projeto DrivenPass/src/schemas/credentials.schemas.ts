import Joi from "joi";

export const credentialCreateSchema = Joi.object({
  title: Joi.string().min(1).required(),
  url: Joi.string().uri().allow(null, "").optional(),
  username: Joi.string().min(1).required(),
  password: Joi.string().min(1).required(),
});

export const credentialUpdateSchema = Joi.object({
  title: Joi.string().min(1).optional(),
  url: Joi.string().uri().allow(null, "").optional(),
  username: Joi.string().min(1).optional(),
  password: Joi.string().min(1).optional(),
}).min(1);