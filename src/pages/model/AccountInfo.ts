// 사용자 토큰 정보
class AccountInfo {
  id: number;

  account_number: number;
  default_account_yn: boolean;
  account_expired_at: Date | null;

  app_key: string | null;
  app_secret: string | null;
  api_token: string | null;
  api_token_expired_at: Date | null;

  constructor(data: any) {
    this.id = data.id;

    this.account_number = data.account_number;
    this.default_account_yn = data.default_account_yn;
    this.account_expired_at = data.account_expired_at;

    this.app_key = data.app_key;
    this.app_secret = data.app_secret;
    this.api_token = data.api_token;
    this.api_token_expired_at = data.api_token_expired_at;
  }
}
