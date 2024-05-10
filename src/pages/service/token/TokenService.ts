import { AccountInfo } from "@/pages/model/AccountInfo";
import {
  TIssueTokenReq,
  TIssueTokenRes,
  TIssueTokenResError,
  TRevokeTokenReq,
} from "./TokenDao";
import { fetchHelperWithData, fetchHelper, axiosPost } from "@/lib/api/helper";
import axios, { AxiosResponse } from "axios";

export const issueAppToken = async (
  data: AccountInfo
): Promise<TIssueTokenRes> => {
  const res = await axiosPost<TIssueTokenReq, TIssueTokenRes>(
    `${process.env.VTS_URL}/oauth2/tokenP`,
    {
      grant_type: "client_credentials",
      appkey: data.appKey,
      appsecret: data.appSecret,
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
