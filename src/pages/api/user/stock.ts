import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ResInvalid, ResOk } from "..";
import StockService from "@/pages/service/stock/StockService";

/**
 * @swagger
 * /api/user/stock:
 *   get:
 *     description: 사용자의 주식 정보를 가져옵니다.
 */
const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  try {
    const { id, currentAccountInfo } = session!.user!;
    const { accountNumber } = currentAccountInfo!;

    const stockInfoList = await StockService.getAmountStockInfoList({
      accountNumber: accountNumber,
    });

    ResOk(stockInfoList, "주식 조회에 성공했습니다.");
  } catch (error) {
    ResInvalid(error, "주식 조회에 실패했습니다.");
  }
};

export default GET;
