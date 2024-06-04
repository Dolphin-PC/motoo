import { NextApiRequest, NextApiResponse } from "next";
import { CResponse, ResOk, ResInvalid } from "..";
import { useApiAccountInfo } from "@/lib/hooks/useAccountInfo";
import orderCash, {
  TOrderCashReq,
  TOrderCashRes,
} from "@/pages/service/openapi/biz/orderCash";
import {
  OrderStatus,
  OrderType,
  StockOrderHistory,
} from "@/pages/model/StockOrderHistory";
import { getKoreanTime } from "@/lib/util/util";

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

      //* 2. stock_order_history에 pending으로 저장
      await StockOrderHistory.create({
        oderNo: data.output.ODNO,
        ooderNo: data.output.ODNO,
        accountNumber,
        stockId: prm.PDNO,
        orderType: orderType === "BUY" ? OrderType.BUY : OrderType.SELL,
        orderStatus: OrderStatus.PENDING,
        orderTime: data.output.ORD_TMD,
        orderPrice: Number(prm.ORD_UNPR),
        orderQuantity: Number(prm.ORD_QTY),
      });

      res.status(200).json(ResOk<TOrderCashRes>(data, data.msg1));
    } catch (error) {
      res.status(401).json(ResInvalid(error, "실패 메시지"));
    }
  }
}
