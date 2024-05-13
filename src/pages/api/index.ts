export enum EnumResonseMessage {
  ACCOUNT_SUCCESS = "계좌인증이 완료되었습니다.",
  ACCOUNT_FAIL = "계좌인증에 실패했습니다.",
}

export enum EnumCResponseStatus {
  SUCCESS = "SUCCESS",
  // ERROR = "ERROR",
  INVALID = "INVALID",
}

export class CResponse<T> {
  status: EnumCResponseStatus;
  message: string;
  body?: T;
  error?: unknown;

  constructor({
    status,
    message,
    body,
    error,
  }: {
    status: EnumCResponseStatus;
    message: string;
    body?: T;
    error?: unknown;
  }) {
    this.status = status;
    this.message = message;
    this.body = body;
    this.error = error;
  }

  static isCResponseError(res: any) {
    return res.message && res.error;
  }
}

export const ResOk = <T>(body: T, message: string): CResponse<T> => {
  return new CResponse({
    status: EnumCResponseStatus.SUCCESS,
    message,
    body,
  });
};

export const ResInvalid = <T>(error: any, message: string): CResponse<T> => {
  return new CResponse({
    status: EnumCResponseStatus.INVALID,
    message,
    // XXX: Error객체는 JSON.stringify를 사용할 수 없어서 Object.getOwnPropertyNames를 사용하여 직렬화
    // Error내부 속성에 enumerable이 없어, 직렬화 수행시 {}로 출력이 됨
    error: JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))),
  });
};
