import { NextApiRequest, NextApiResponse } from "next";
import { CResponse, ResInvalid, ResOk } from "@/pages/api/index";
import { useApiAccountInfo } from "@/lib/hooks/useAccountInfo";
import { AmountMoney } from "@/pages/model/AmountMoney";
import { AmountStock } from "@/pages/model/AmountStock";
import inquireStockBalance from "@/pages/service/openapi/biz/inquireStockBalance";

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
      const resData = await inquireStockBalance({
        accountNumber: accountInfo.accountNumber,
        appkey: accountInfo.appKey,
        appsecret: accountInfo.appSecret,
        VTS_TOKEN: accountInfo.apiToken,
      });
      let [fk100, nk100] = [
        resData.ctx_area_fk100.trim(),
        resData.ctx_area_nk100.trim(),
      ];

      //* 1. amount_money 테이블 동기화
      await AmountMoney.update({
        accountNumber: accountInfo.accountNumber,
        data: resData.output2,
      });

      //* 2. amount_stock 테이블 동기화
      const updateList = resData.output1.map((output1) => {
        return {
          stockId: output1.pdno,
          quantity: Number(output1.hldg_qty),
          avgAmount: Number(output1.pchs_avg_pric),
        };
      });

      // 추가데이터가 있을 경우, updateList에 push
      while (fk100 != "" && nk100 != "") {
        const resData = await inquireStockBalance({
          accountNumber: accountInfo.accountNumber,
          appkey: accountInfo.appKey,
          appsecret: accountInfo.appSecret,
          VTS_TOKEN: accountInfo.apiToken,
        });

        const newList = resData.output1.map((output1) => {
          return {
            stockId: output1.pdno,
            quantity: Number(output1.hldg_qty),
            avgAmount: Number(output1.pchs_avg_pric),
          };
        });
        updateList.push(...newList);

        [fk100, nk100] = [
          resData.ctx_area_fk100.trim(),
          resData.ctx_area_nk100.trim(),
        ];
      }

      await Promise.all(
        updateList.map(
          async (update) =>
            await AmountStock.upsert({
              accountNumber: accountInfo.accountNumber,
              data: update,
            })
        )
      );

      res.status(200).json(ResOk<any>(null, "Successfull sync account info"));
    } catch (error) {
      console.error(error);
      res.status(401).json(ResInvalid(error, "Failed sync account info"));
    }
  }
}
