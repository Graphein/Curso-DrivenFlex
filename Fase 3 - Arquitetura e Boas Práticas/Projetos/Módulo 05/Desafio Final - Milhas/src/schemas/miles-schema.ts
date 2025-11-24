import Joi from "joi";
import { AffiliateStatus, ServiceClass } from "../protocols";

const milesSchema = Joi.object({
  code: Joi.string().required(),
  origin: Joi.object({
    lat: Joi.number().required(),
    long: Joi.number().required()
  }).required(),
  destination: Joi.object({
    lat: Joi.number().required(),
    long: Joi.number().required()
  }).required(),
  miles: Joi.boolean().required(),
  plane: Joi.string().required(),
  service: Joi.string().valid(...Object.values(ServiceClass)).required(),
  affiliate: Joi.string().valid(...Object.values(AffiliateStatus)).optional(),
  date: Joi.date().iso().required() // yyyy-mm-dd
});

export default milesSchema;