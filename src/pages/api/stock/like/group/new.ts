/**
 * @swagger
 *
 * /api/stock/like/group/new:
 *  post:
 *    tags:
 *      - Stock
 *    description: 새로운 관심주식 그룹을 생성합니다.
 *
 */

import { useApiAccountInfo } from "@/lib/hooks/useAccountInfo";
import { ResOk } from "@/pages/api";
import { GroupLikeStock } from "@/model/GroupLikeStock";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.info("[POST] /stock/like/group/new");
  try {
    switch (req.method) {
      case "POST": {
        const { accountNumber } = await useApiAccountInfo(req, res);
        const { groupName } = req.body;
        console.info("[POST] /stock/like/group/new", {
          accountNumber,
          groupName,
        });

        await GroupLikeStock.create({ accountNumber, groupName });

        res.status(200).json(ResOk({}, "새로운 관심그룹을 생성했습니다."));
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
}
