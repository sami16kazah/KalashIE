import { CustomErrors } from "./custom_errors";

export class DataBaseConnectionError extends CustomErrors {
  reason = "Error Connecting To DataBase !";
  statusCode = 500;
  constructor() {
    super();
    Object.setPrototypeOf(this, DataBaseConnectionError.prototype);
  }
  serilizeErrors() {
    return [{ message: this.reason }];
  }
}
