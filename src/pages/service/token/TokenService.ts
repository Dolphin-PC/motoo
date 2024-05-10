import { AccountInfo, EAccountType } from "@/pages/model/AccountInfo";
import { TIssueTokenReq, TIssueTokenRes, TRevokeTokenReq } from "./TokenDao";
import { fetchHelper, axiosPost } from "@/lib/api/helper";
import { TNewAccount } from "@/app/v/my/account/new/page";
import { ValidationError, validate, validateOrReject } from "class-validator";

export const issueAppToken = async ({
  accountNumber,
  appKey,
  appSecret,
}: TNewAccount): Promise<TIssueTokenRes> => {
  const accountInfo = new AccountInfo();

  accountInfo.type = EAccountType.VERIFY_ACCOUNT;
  accountInfo.accountNumber = accountNumber;
  accountInfo.appKey = appKey;
  accountInfo.appSecret = appSecret;

  await validateOrReject(accountInfo).catch((errors: ValidationError[]) => {
    console.log(errors);
    throw errors[0];
  });

  const res = await axiosPost<TIssueTokenReq, TIssueTokenRes>(
    `${process.env.VTS_URL}/oauth2/tokenP`,
    {
      grant_type: "client_credentials",
      appkey: accountInfo.appKey,
      appsecret: accountInfo.appSecret,
    }
  );

  return res;
};

export const revokeAppToken = async (
  data: AccountInfo,
  token: TRevokeTokenReq["token"]
) => {
  await fetchHelper<TRevokeTokenReq>({
    method: "POST",
    url: `${process.env.VTS_URL}/oauth2/revokeP`,
    data: {
      appKey: data.appKey,
      appSecret: data.appSecret,
      token: token,
    },
  });
};
