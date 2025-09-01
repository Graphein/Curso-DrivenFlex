import AppError from "./AppError";
export default class BadRequestError extends AppError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}
