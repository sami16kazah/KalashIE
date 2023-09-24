import { CustomErrors } from "./custom_errors";

export class BadRequestError extends CustomErrors {
  statusCode = 400;
  constructor(public message: string) {
    super();
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
  serilizeErrors() {
    return [{ message: this.message }];
  }
}
