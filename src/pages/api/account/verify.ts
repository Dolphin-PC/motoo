import { TNewAccount } from "@/app/v/my/account/new/page";
import { AccountInfo, EAccountType } from "@/pages/model/AccountInfo";
import {
  TIssueTokenRes,
  TIssueTokenResError,
} from "@/pages/service/token/TokenDao";
import { issueAppToken } from "@/pages/service/token/TokenService";
import { validateOrReject } from "class-validator";
import { NextApiRequest, NextApiResponse } from "next";
import { CResponse, EnumResonseMessage } from "..";
import { AxiosError } from "axios";

export default async function POST(
  req: NextApiRequest,
  res: NextApiResponse<CResponse<TIssueTokenRes>>
) {
  const { accountNumber, appKey, appSecret }: TNewAccount = req.body;

  try {
    const accountInfo = new AccountInfo();

    accountInfo.type = EAccountType.VERIFY_ACCOUNT;
    accountInfo.accountNumber = accountNumber;
    accountInfo.appKey = appKey;
    accountInfo.appSecret = appSecret;

    await validateOrReject(accountInfo);

    const data = await issueAppToken(accountInfo);

    res.status(200).json(
      new CResponse({
        message: EnumResonseMessage.ACCOUNT_SUCCESS,
        body: data,
      })
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = error.response?.data as TIssueTokenResError;

      // console.log(errorData);
      res.status(403).json(
        new CResponse({
          message: errorData.error_description,
          error: error,
        })
      );
    }

    res.status(400).json(
      new CResponse({
        message: EnumResonseMessage.ACCOUNT_FAIL,
        error: error,
      })
    );
  }
}

export function GET(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: "Hello" });
}
