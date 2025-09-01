import type { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service";
import UnprocessableEntityError from "../errors/UnprocessableEntityError";

export async function signUp(req: Request, res: Response, next: NextFunction) {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      throw new UnprocessableEntityError("Todos os campos são obrigatórios");
    }

    await authService.signUp(name, email, password);
    res.sendStatus(201); 
  } catch (e) {
    next(e);
  }
}

export async function signIn(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new UnprocessableEntityError("E-mail e senha são obrigatórios");
    }

    const token = await authService.signIn(email, password);
    res.status(200).send({ token });
  } catch (e) {
    next(e);
  }
}
