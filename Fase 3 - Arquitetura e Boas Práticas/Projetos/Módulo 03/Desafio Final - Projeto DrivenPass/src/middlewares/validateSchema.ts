import { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";

export function validateSchema(schema: ObjectSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) return next(Object.assign(error, { isJoi: true }));
    next();
  };
}
