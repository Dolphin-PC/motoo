import { NextApiRequest, NextApiResponse } from "next";
import { CResponse, ResOk, ResInvalid } from "..";
import { useApiAccountInfo } from "@/lib/hooks/useAccountInfo";
import {
  OpenApiService,
  TOrderCashReq,
  TOrderCashRes,
} from "@/pages/service/openapi/OpenApiService";

/**
 * @swagger
 *
 * /api/stock/order:
 *  POST:
 *    tags:
 *      -  Stock
 *    description: 주식 매수/매도 주문
 *
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CResponse<TOrderCashRes>>
) {
  if (req.method == "POST") {
    const { orderType, ...prm }: TOrderCashReq & { orderType: "BUY" | "SELL" } =
      req.body;
    const { accountNumber, appKey, appSecret, apiToken } =
      await useApiAccountInfo(req, res);

    try {
      const data = await OpenApiService.orderCash(
        { VTS_APPKEY: appKey, VTS_APPSECRET: appSecret, VTS_TOKEN: apiToken },
        orderType,
        prm
      );

      res.status(200).json(ResOk<TOrderCashRes>(data, data.msg));
    } catch (error) {
      res.status(401).json(ResInvalid(error, "실패 메시지"));
    }
  }
}
