import { NextApiRequest, NextApiResponse } from "next";
import { CResponse, ResOk, ResInvalid } from "..";
import { AmountMoney } from "@/model/AmountMoney";

/**
 * @swagger
 *
 * /api/amountMoney/[...accountNumber]
 *   GET:
 *    tags:
 *      - AmountMoney
 *    description: 계좌별 자산현황 조회 API
 *
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CResponse<AmountMoney>>
) {
  if (req.method == "GET") {
    try {
      const { accountNumber } = req.query;

      const data = await AmountMoney.findUnique({
        where: {
          account_number: accountNumber![0],
        },
      });

      res.status(200).json(ResOk<AmountMoney>(data, "자산조회 성공"));
    } catch (error) {
      res.status(401).json(ResInvalid(error, "실패 메시지"));
    }
  }
}
