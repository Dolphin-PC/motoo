import { NextApiRequest, NextApiResponse } from "next";
import { CResponse, ResInvalid, ResOk } from "@/pages/api/index";
import { useApiAccountInfo } from "@/lib/hooks/useAccountInfo";
import { getKoreanTime, splitDate } from "@/lib/util/util";
import inquireTimeItemChartPrice, {
  TInquireTimeItemChartPriceRes,
} from "@/pages/service/openapi/biz/inquireTimeItemChartPrice";

/**
 * @swagger
 *
 * /api/stock/today-one-minute:
 *   POST:
 *    tags:
 *      - Stock
 *    description: 주식의 당일 분봉을 조회합니다.
 *
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CResponse<TInquireTimeItemChartPriceRes>>
) {
  if (req.method == "POST") {
    try {
      const { apiToken, appKey, appSecret } = await useApiAccountInfo(req, res);
      const { stockId } = req.body;

      const { hour, minute } = splitDate(getKoreanTime());
      let timeStr = hour + minute + "00";
      if (timeStr >= "153000") timeStr = "153000";

      const resData = await inquireTimeItemChartPrice({
        stockId,
        VTS_APPKEY: appKey,
        VTS_APPSECRET: appSecret,
        VTS_TOKEN: apiToken,
        startTime: timeStr,
      });
      // console.info(resData);
      resData.time = {
        hour: timeStr.slice(0, 2),
        minute: timeStr.slice(2, 4),
      };
      res
        .status(200)
        .json(ResOk<TInquireTimeItemChartPriceRes>(resData, "success"));
    } catch (error) {
      console.error(error);
      res.status(401).json(ResInvalid(error, "분봉 조회 실패"));
    }
  }
}
