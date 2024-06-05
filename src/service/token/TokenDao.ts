export type TIssueTokenReq = {
  grant_type: string;
  appkey: string;
  appsecret: string;
};

export type TIssueTokenRes = {
  access_token: string;
  access_token_token_expired: Date;
  token_type: string;
  expires_in: number;
};

export type TIssueTokenResError = {
  error_code: string;
  error_description: string;
};

export type TRevokeTokenReq = {
  appKey: string;
  appSecret: string;
  token: string;
};
