import { NextApiRequest, NextApiResponse } from "next";
import { StockInfo } from "@/pages/model/StockInfo";
import { CResponse, ResOk } from "@/pages/api/index";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CResponse<StockInfo[]>>
) {
  if (req.method == "GET") {
    const search = req.query.search?.toString() || "";

    const list = await StockInfo.findMany({
      where: {
        OR: [
          { name: { contains: search } },
          { stock_id: { contains: search } },
        ],
      },
    });

    res.status(200).json(ResOk<StockInfo[]>(list, "검색 성공"));
  }
}
