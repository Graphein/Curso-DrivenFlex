import type { Request, Response, NextFunction } from "express";
import rechargesService from "../services/recharges.service";

export async function createRecharge(req: Request, res: Response, next: NextFunction) {
  try {
    const recharge = await rechargesService.createRecharge(req.body);
    res.status(201).send(recharge);
  } catch (err) {
    next(err);
  }
}

export async function getRechargesByNumber(req: Request, res: Response, next: NextFunction) {
  try {
    const { number } = req.params as { number: string };
    const recharges = await rechargesService.getRechargesByNumber(number);
    res.send(recharges);
  } catch (err) {
    next(err);
  }
}

const rechargesController = {
  createRecharge,
  getRechargesByNumber
};

export default rechargesController;
