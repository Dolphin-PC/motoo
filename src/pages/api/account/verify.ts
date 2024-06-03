import { TVerifyAccount } from "@/app/v/my/account/new/page";
import {
  TIssueTokenRes,
  TIssueTokenResError,
} from "@/pages/service/token/TokenDao";
import { ValidationError } from "class-validator";
import { NextApiRequest, NextApiResponse } from "next";
import { CResponse, EnumResonseMessage, ResInvalid, ResOk } from "..";
import { AxiosError } from "axios";
import { getMessageFromValidaionError } from "@/lib/util/util";
import { OpenApiService } from "@/pages/service/openapi/OpenApiService";
import inquireStockBalance from "@/pages/service/openapi/biz/inquireStockBalance";

export default async function POST(
  req: NextApiRequest,
  res: NextApiResponse<CResponse<TIssueTokenRes>>
) {
  const { accountNumber, appKey, appSecret }: TVerifyAccount = req.body;

  // console.log(accountNumber, appKey, appSecret);

  try {
    const data = await OpenApiService.issueApiToken({
      accountNumber,
      appKey,
      appSecret,
    });

    await inquireStockBalance({
      accountNumber,
      appkey: appKey,
      appsecret: appSecret,
      VTS_TOKEN: data.access_token,
    });

    res.status(200).json(ResOk(data, EnumResonseMessage.ACCOUNT_SUCCESS));
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = error.response?.data as TIssueTokenResError;

      // console.log(errorData);
      res.status(403).json(ResInvalid(errorData, errorData.error_description));
    } else if (error instanceof ValidationError) {
      res
        .status(400)
        .json(ResInvalid(error, getMessageFromValidaionError(error)));
    } else if (error instanceof Error) {
      res.status(400).json(ResInvalid(error, error.message));
    } else {
      res.status(400).json(ResInvalid(error, EnumResonseMessage.ACCOUNT_FAIL));
    }
  }
}

export function GET(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: "Hello" });
}
