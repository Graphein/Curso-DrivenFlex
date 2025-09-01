import { Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/auth";
import { credentialsService } from "../services/credentials.service";
import BadRequestError from "../errors/BadRequestError";

export async function createCredential(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    await credentialsService.create(req.userId!, req.body);
    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
}

export async function listCredentials(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const result = await credentialsService.list(req.userId!);
    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
}

export async function getCredential(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      throw new BadRequestError("ID inválido. O ID deve ser um número inteiro positivo.");
    }
    const result = await credentialsService.getById(req.userId!, id);
    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
}

export async function updateCredential(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      throw new BadRequestError("ID inválido. O ID deve ser um número inteiro positivo.");
    }
    await credentialsService.update(req.userId!, id, req.body);
    res.sendStatus(204); 
  } catch (e) {
    next(e);
  }
}

export async function deleteCredential(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      throw new BadRequestError("ID inválido. O ID deve ser um número inteiro positivo.");
    }
    await credentialsService.remove(req.userId!, id);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
}

export async function eraseAll(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    await credentialsService.eraseAll(req.userId!);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
}
