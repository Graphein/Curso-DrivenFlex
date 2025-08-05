import { Request, Response } from "express";
import { findCoupons, insertCoupon } from "../services/coupons-service";
import { CouponCreateData } from "../protocols";

export function getCoupons(req: Request, res: Response) {
  const coupons = findCoupons();
  res.send(coupons);
}

export function createCoupons(req: Request, res: Response) {
  const couponData = req.body as CouponCreateData;
  insertCoupon(couponData);
  res.sendStatus(201);
}