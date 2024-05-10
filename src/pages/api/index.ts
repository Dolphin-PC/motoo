export enum EnumResonseMessage {
  ACCOUNT_SUCCESS = "계좌인증이 완료되었습니다.",
  ACCOUNT_FAIL = "계좌인증에 실패했습니다.",
}

export class CResponse<T> {
  message: string;
  body?: T;
  error?: unknown;

  constructor({
    message,
    body,
    error,
  }: {
    message: string;
    body?: T;
    error?: unknown;
  }) {
    this.message = message;
    this.body = body;
    this.error = error;
  }

  static isCResponseError(res: any) {
    return res.message && res.error;
  }
}
