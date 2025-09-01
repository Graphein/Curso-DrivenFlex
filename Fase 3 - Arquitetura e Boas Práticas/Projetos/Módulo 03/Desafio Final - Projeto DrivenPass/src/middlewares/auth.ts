import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/database";
import UnauthorizedError from "../errors/UnauthorizedError";

export type AuthRequest = Request & { userId?: number };

export function auth(req: AuthRequest, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header) throw new UnauthorizedError("Token de autenticação ausente");
  const token = header.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as { userId: number };
    req.userId = payload.userId;
    next();
  } catch {
    throw new UnauthorizedError("Token de autenticação inválido");
  }
}
