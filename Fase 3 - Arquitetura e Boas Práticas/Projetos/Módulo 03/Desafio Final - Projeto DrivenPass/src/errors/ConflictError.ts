import AppError from "./AppError";
export default class ConflictError extends AppError {
  constructor(message = "Conflict") {
    super(message, 409);
  }
}
