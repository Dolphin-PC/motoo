export class CResponse<T> {
  message: string;
  data?: T;
  error?: Object;

  constructor(message: string, data?: T, error?: Object) {
    this.message = message;
    this.data = data;
    this.error = error;
  }

  static isCResponse(res: any) {
    return res.message;
  }
}
