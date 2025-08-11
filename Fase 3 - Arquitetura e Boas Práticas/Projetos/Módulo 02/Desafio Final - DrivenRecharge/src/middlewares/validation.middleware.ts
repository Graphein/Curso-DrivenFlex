import type { ObjectSchema } from "joi";
import type { Request, Response, NextFunction } from "express";

export function validateBody(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.validate(req.body, { abortEarly: false });

    if (validation.error) {
      const messages = validation.error.details.map(detail => detail.message);
      return res.status(422).send({ errors: messages });
    }

    next();
  };
}
