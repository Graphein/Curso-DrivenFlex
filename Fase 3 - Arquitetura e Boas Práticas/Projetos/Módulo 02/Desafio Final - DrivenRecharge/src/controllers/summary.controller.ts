import type { Request, Response, NextFunction } from "express";
import summaryService from "../services/summary.service";

export async function getSummary(req: Request, res: Response, next: NextFunction) {
  try {
    const { document } = req.params as { document: string };
    const result = await summaryService.getSummary(document);
    res.send(result);
  } catch (err) {
    next(err);
  }
}

const summaryController = {
  getSummary
};

export default summaryController;
