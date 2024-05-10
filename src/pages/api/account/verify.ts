import { TNewAccount } from "@/app/v/my/account/new/page";
import { AccountInfo, EAccountType } from "@/pages/model/AccountInfo";
import {
  TIssueTokenRes,
  TIssueTokenResError,
} from "@/pages/service/token/TokenDao";
import { issueAppToken } from "@/pages/service/token/TokenService";
import { ValidationError, validateOrReject } from "class-validator";
import { NextApiRequest, NextApiResponse } from "next";
import { CResponse, EnumResonseMessage } from "..";
import { AxiosError } from "axios";
import { getMessageFromValidaionError } from "@/lib/util/util";

export default async function POST(
  req: NextApiRequest,
  res: NextApiResponse<CResponse<TIssueTokenRes>>
) {
  const { accountNumber, appKey, appSecret }: TNewAccount = req.body;

  try {
    const data = await issueAppToken({ accountNumber, appKey, appSecret });

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
          error: errorData,
        })
      );
    } else if (error instanceof ValidationError) {
      res.status(400).json(
        new CResponse({
          message: getMessageFromValidaionError(error),
          error: error,
        })
      );
    } else {
      res.status(400).json(
        new CResponse({
          message: EnumResonseMessage.ACCOUNT_FAIL,
          error: error,
        })
      );
    }
  }
}

export function GET(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: "Hello" });
}
