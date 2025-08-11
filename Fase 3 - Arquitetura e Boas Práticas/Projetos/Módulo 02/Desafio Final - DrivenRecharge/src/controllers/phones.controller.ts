import type { Request, Response, NextFunction } from "express";
import phonesService from "../services/phones.service";

export async function createPhone(req: Request, res: Response, next: NextFunction) {
  try {
    await phonesService.createPhone(req.body);
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

export async function getPhonesByDocument(req: Request, res: Response, next: NextFunction) {
  try {
    const { document } = req.params as { document: string };
    const phones = await phonesService.getPhonesByDocument(document);
    res.send(phones);
  } catch (err) {
    next(err);
  }
}

const phonesController = {
  createPhone,
  getPhonesByDocument
};

export default phonesController;
