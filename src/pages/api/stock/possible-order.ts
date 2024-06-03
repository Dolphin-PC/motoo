import { NextApiRequest, NextApiResponse } from "next";
import { CResponse, ResOk, ResInvalid } from "..";
import {
  OpenApiService,
  TInquirePsblOrderReq,
  TInquirePsblOrderRes,
} from "@/pages/service/openapi/OpenApiService";
import { useApiAccountInfo } from "@/lib/hooks/useAccountInfo";

/**
 * @swagger
 *
 * /api/stock/possible-order:
 *   POST:
 *    tags:
 *      -  Stock
 *    description: 주식 매수가능조회 API
 *
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CResponse<TInquirePsblOrderRes>>
) {
  if (req.method == "POST") {
    try {
      const { orderPrice, orderType, stockId }: TInquirePsblOrderReq = req.body;

      const accountInfo = await useApiAccountInfo(req, res);

      const possibleRes = await OpenApiService.inquirePsblOrder(
        {
          VTS_APPKEY: accountInfo.appKey,
          VTS_APPSECRET: accountInfo.appSecret,
          VTS_TOKEN: accountInfo.apiToken,
        },
        {
          accountNumber: accountInfo.accountNumber,
          orderPrice: orderPrice,
          orderType: orderType,
          stockId: stockId,
        }
      );

      if (!possibleRes) throw new Error("매수가능조회 실패");

      res
        .status(200)
        .json(ResOk<TInquirePsblOrderRes>(possibleRes, possibleRes.msg1));
    } catch (error) {
      res.status(401).json(ResInvalid(error, "실패 메시지"));
    }
  }
}
