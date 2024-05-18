import {
  AccountInfo,
  AccountInfoValidatorGroups,
} from "@/pages/model/AccountInfo";
import { TIssueTokenReq, TIssueTokenRes, TRevokeTokenReq } from "./TokenDao";
import { fetchHelper, axiosPost } from "@/lib/api/helper";
import { TNewAccount } from "@/app/v/my/account/new/page";
import { ValidationError, validate, validateOrReject } from "class-validator";
import { User } from "@/pages/model/User";

/**
 * @desc 현재 JWT의 정보를 읽고, api_token이 없거나 만료되었을 경우 새로운 api_token을 발급한다.
 */
export const reIssueApiToken = async (user: User) => {
  const { appKey, appSecret, apiToken, apiTokenExpiredAt } =
    user.currentAccountInfo!;

  console.log(apiTokenExpiredAt);
};

/**
 * @description 토큰 발급
 */
export const issueApiToken = async ({
  accountNumber,
  appKey,
  appSecret,
}: TNewAccount): Promise<TIssueTokenRes> => {
  const accountInfo = new AccountInfo();

  accountInfo.accountNumber = accountNumber;
  accountInfo.appKey = appKey;
  accountInfo.appSecret = appSecret;

  await validateOrReject(accountInfo, {
    groups: [AccountInfoValidatorGroups.verify],
  }).catch((errors: ValidationError[]) => {
    // console.log(errors);
    throw errors[0];
  });

  const res = await axiosPost<TIssueTokenReq, TIssueTokenRes>(
    `${process.env.VTS}/oauth2/tokenP`,
    {
      grant_type: "client_credentials",
      appkey: accountInfo.appKey,
      appsecret: accountInfo.appSecret,
    }
  );

  res.access_token_token_expired = new Date(res.access_token_token_expired);

  return res;
};

/**
 * @desc 토큰 폐기
 */
export const revokeAppToken = async (
  data: AccountInfo,
  token: TRevokeTokenReq["token"]
) => {
  await fetchHelper<TRevokeTokenReq>({
    method: "POST",
    url: `${process.env.VTS}/oauth2/revokeP`,
    data: {
      appKey: data.appKey,
      appSecret: data.appSecret,
      token: token,
    },
  });
};
