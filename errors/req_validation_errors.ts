import { ValidationError } from "express-validator";
import { CustomErrors } from "./custom_errors";
export class RequestValidationError extends CustomErrors {
  statusCode = 400;
  constructor(private errors: ValidationError[]) {
    super();
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  serilizeErrors() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.type };
    });
  }
}
