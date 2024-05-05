// 사용자 토큰 정보
class TokenInfo {
  id: number;

  APP_KEY: string | null;
  APP_SECRET: string | null;
  APP_KEY_EXPIRED_AT: Date | null;
  API_TOKEN: string | null;
  API_TOKEN_EXPIRED_AT: Date | null;

  constructor(data: any) {
    this.id = data.id;
    this.APP_KEY = data.APP_KEY;
    this.APP_SECRET = data.APP_SECRET;
    this.APP_KEY_EXPIRED_AT = data.APP_KEY_EXPIRED_AT;
    this.API_TOKEN = data.API_TOKEN;
    this.API_TOKEN_EXPIRED_AT = data.API_TOKEN_EXPIRED_AT;
  }
}
