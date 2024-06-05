import { NextApiRequest, NextApiResponse } from "next";
import { CResponse, ResOk, ResInvalid } from "..";
import { useApiAccountInfo } from "@/lib/hooks/useAccountInfo";
import orderCash, {
  TOrderCashReq,
  TOrderCashRes,
} from "@/service/openapi/biz/orderCash";

export type DaoOrderCashReq = Omit<TOrderCashReq, "CANO"> & {
  orderType: "BUY" | "SELL";
};

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
    const { orderType, ...prm }: DaoOrderCashReq = req.body;
    const { accountNumber, appKey, appSecret, apiToken } =
      await useApiAccountInfo(req, res);

    try {
      //* 1. 주문 처리
      const data = await orderCash(
        { VTS_APPKEY: appKey, VTS_APPSECRET: appSecret, VTS_TOKEN: apiToken },
        orderType,
        {
          CANO: accountNumber,
          ...prm,
        }
      );

      res.status(200).json(ResOk<TOrderCashRes>(data, data.msg1));
    } catch (error) {
      res.status(401).json(ResInvalid(error, "실패 메시지"));
    }
  }
}
