import { Request, Response } from "express";
import { Trip } from "../protocols";
import httpStatus from "http-status";
import { calculateMiles } from "../services/miles-calculator-service";
import { generateMilesForTrip, getMilesFromCode } from "../services/miles-service";

export async function generateMiles(req: Request, res: Response) {
  const tripData = req.body as Trip;
  const miles = await generateMilesForTrip(tripData);

  return res.status(httpStatus.CREATED).send({
    miles,
    code: tripData.code,
  });
}

export async function recoverMiles(req: Request, res: Response) {
  const { code } = req.params;
  const miles = await getMilesFromCode(code);

  return res.send(miles);
}