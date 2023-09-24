import { CustomErrors } from "./custom_errors";

export class NotAuthourizedError extends CustomErrors {
  statusCode = 401;
  constructor(public message: string) {
    super();
    Object.setPrototypeOf(this, NotAuthourizedError.prototype);
  }
  serilizeErrors() {
    return [{ message: this.message }];
  }
}
