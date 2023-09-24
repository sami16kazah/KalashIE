export abstract class CustomErrors extends Error {
  abstract statusCode: number;
  constructor() {
    super();
    Object.setPrototypeOf(this, CustomErrors.prototype);
  }
  abstract serilizeErrors(): { message: string; field?: string }[];
}
