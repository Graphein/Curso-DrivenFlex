import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err?.isJoi) {
    const details = err.details?.map((d: any) => d.message) ?? [];
    return res.status(422).send({ error: "Erro de validação", details });
  }
  if (err?.code === "P2002") {
    return res.status(409).send({ error: "Violação de unicidade (dados duplicados)" });
  }
  if (err instanceof AppError) {
    return res.status(err.status).send({ error: err.message });
  }
  console.error(err);
  return res.status(500).send({ error: "Internal Server Error" });
}
