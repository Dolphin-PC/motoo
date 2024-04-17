export class CResponse<T> {
  message: string;
  data?: T;
  error?: Object;

  constructor(message: string, data?: T, error?: Object) {
    this.message = message;
    this.data = data;
    this.error = error;
  }

  static isCResponseError(res: any) {
    return res.message && res.error;
  }
}
