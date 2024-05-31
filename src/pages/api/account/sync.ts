import { NextApiRequest, NextApiResponse } from "next";
import { CResponse, ResInvalid, ResOk } from "@/pages/api/index";
import { OpenApiService } from "@/pages/service/openapi/OpenApiService";
import { useApiAccountInfo } from "@/lib/hooks/useAccountInfo";
import { AmountMoney } from "@/pages/model/AmountMoney";

/**
 * @swagger
 *
 * /api/account/sync:
 *  POST:
 *    tags:
 *      - Account
 *    description: 계좌정보<->한국투자증권 [주식잔고조회] 동기화
 *
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CResponse<any>>
) {
  if (req.method == "POST") {
    try {
      const accountInfo = await useApiAccountInfo(req, res);
      const resData = await OpenApiService.inquireStockBalance({
        accountNumber: accountInfo.accountNumber,
        appkey: accountInfo.appKey,
        appsecret: accountInfo.appSecret,
        VTS_TOKEN: accountInfo.apiToken,
      });

      await AmountMoney.syncInfo({
        accountNumber: accountInfo.accountNumber,
        data: resData.output2,
      });

      res.status(200).json(ResOk<any>(null, "Successfull sync account info"));
    } catch (error) {
      console.error(error);
      res.status(401).json(ResInvalid(error, "Failed sync account info"));
    }
  }
}
