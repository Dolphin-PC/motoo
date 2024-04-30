// 사용자 토큰 정보
class TokenInfo {
  appKey?: string;
  appSecret?: string;
  appKeyExpiredAt: Date;
  apiToken?: string;
  apiTokenExpiredAt: Date;

  constructor(data: any) {
    this.appKey = data.appKey;
    this.appSecret = data.appSecret;
    this.appKeyExpiredAt = data.appKeyExpiredAt;
    this.apiToken = data.apiToken;
    this.apiTokenExpiredAt = data.apiTokenExpiredAt;
  }

  fromFirebase(data: any): TokenInfo {
    return new TokenInfo(data);
  }
}
