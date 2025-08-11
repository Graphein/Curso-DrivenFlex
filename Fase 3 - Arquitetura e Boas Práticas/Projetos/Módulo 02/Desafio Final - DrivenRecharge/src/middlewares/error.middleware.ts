import type { Request, Response, NextFunction } from "express";

export function handleErrors(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.name === "BadRequestError") {
    return res.status(400).send({ message: err.message });
  }

  if (err.name === "NotFoundError") {
    return res.status(404).send({ message: err.message });
  }

  if (err.name === "UnprocessableEntityError") {
    return res.status(422).send({ message: err.message });
  }

  if (err.name === "ConflictError") {
    return res.status(409).send({ message: err.message });
  }

  console.error("Erro não tratado:", err);
  return res.status(500).send({ message: "Internal Server Error" });
}
