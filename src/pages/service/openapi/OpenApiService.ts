import { TVerifyAccount } from "@/app/v/my/account/new/page";
import { axiosPost } from "@/lib/api/helper";
import {
  AccountInfo,
  AccountInfoValidatorGroups,
} from "@/pages/model/AccountInfo";
import { ValidationError, validateOrReject } from "class-validator";
import { TIssueTokenReq, TIssueTokenRes } from "../token/TokenDao";

/** @desc 한국투자증권 API통신을 위한 공통 파라미터 */
export type TApiCommonReq = {
  VTS_TOKEN: AccountInfo["apiToken"];
  VTS_APPKEY: AccountInfo["appKey"];
  VTS_APPSECRET: AccountInfo["appSecret"];
};

export type TApiCommonRes = {
  /** 성공실패여부(0성공, 0이외 실패) */
  rt_cd: string;
  /** 응답코드 */
  msg_cd: string;
  /** 응답메세지 */
  msg: string;
};

export type TApprovalReq = {
  grant_type: string;
  appkey: string;
  secretkey: string;
};

export type TApprovalRes = {
  approval_key: string;
};

export const OpenApiService = {
  /** @desc 한국투자증권 API 토큰 발급
   * @param param0
   * @returns
   */
  issueApiToken: async function ({
    accountNumber,
    appKey,
    appSecret,
  }: TVerifyAccount): Promise<TIssueTokenRes> {
    const accountInfo = new AccountInfo({
      accountNumber,
      appKey,
      appSecret,
    });

    await validateOrReject(accountInfo, {
      groups: [AccountInfoValidatorGroups.verify],
    }).catch((errors: ValidationError[]) => {
      // console.log(errors);
      throw errors[0];
    });

    const res = await axiosPost<TIssueTokenReq, TIssueTokenRes>(
      `${process.env.NEXT_PUBLIC_VTS_URL}/oauth2/tokenP`,
      {
        grant_type: "client_credentials",
        appkey: accountInfo.appKey,
        appsecret: accountInfo.appSecret,
      }
    );

    res.access_token_token_expired = new Date(res.access_token_token_expired);

    return res;
  },

  /** @desc 웹소켓접속키 발급
   * @see https://apiportal.koreainvestment.com/apiservice/oauth2#L_5c87ba63-740a-4166-93ac-803510bb9c02
   */
  issueWebSocketApprovalKey: async function ({
    appKey,
    secretKey,
  }: {
    appKey: AccountInfo["appKey"];
    secretKey: AccountInfo["appSecret"];
  }) {
    const res = await axiosPost<TApprovalReq, TApprovalRes>(
      `${process.env.NEXT_PUBLIC_VTS_URL}/oauth2/Approval`,
      {
        grant_type: "client_credentials",
        appkey: appKey,
        secretkey: secretKey,
      }
    );

    return res;
  },
};
