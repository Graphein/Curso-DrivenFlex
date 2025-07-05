import Joi from 'joi';

export const userSchema = Joi.object({
  username: Joi.string().required(),
  avatar: Joi.string().uri().required()
});
