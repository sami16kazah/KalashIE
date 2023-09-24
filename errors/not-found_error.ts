import { CustomErrors } from "./custom_errors";

export class NotFoundError extends CustomErrors {
  statusCode = 404;
  constructor() {
    super();
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serilizeErrors() {
    return [{ message: "Page Not Found" }];
  }
}
