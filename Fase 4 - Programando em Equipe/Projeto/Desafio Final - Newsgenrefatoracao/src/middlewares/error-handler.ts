import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

export class AppError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export default function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(error);
  
  if (error?.status && typeof error.status === "number") {
    return res.status(error.status).send({
      error: error.message,
    });
  }

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: "Internal server error",
  });
}
