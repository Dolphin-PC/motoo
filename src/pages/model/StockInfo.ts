import { PRICE_EXPIRED_TIME } from "@/lib/common";
import prisma from "../service/prismaClient";
import { AccountInfo } from "./AccountInfo";
import { BaseModel } from "./Base";
import { OpenApiService } from "../service/openapi/OpenApiService";
import { getKoreanTime } from "@/lib/util/util";
import { Prisma } from "@prisma/client";

// # 주식정보
export class StockInfo extends BaseModel {
  stockId: string;
  type: string;
  name: string;
  imgSrc?: string;

  price?: number;
  priceUpdateAt?: Date;

  constructor(data: any) {
    super(data);
  }

  // methods //
  /**@description 주식 정보를 업데이트합니다.
   * @param param0
   * @returns
   */
  async updateInfo({
    VTS_APPKEY,
    VTS_APPSECRET,
    VTS_TOKEN,
  }: {
    VTS_APPKEY: AccountInfo["appKey"];
    VTS_APPSECRET: AccountInfo["appSecret"];
    VTS_TOKEN: string;
  }): Promise<StockInfo> {
    const newStockInfo = await OpenApiService.getStockPrice({
      VTS_TOKEN,
      VTS_APPKEY,
      VTS_APPSECRET,
      stockId: this.stockId,
    });
    return new StockInfo(
      await prisma.stockInfo.update({
        where: {
          stock_id: this.stockId,
        },
        data: {
          price: parseInt(newStockInfo.output.stck_prpr),
          price_update_at: new Date(getKoreanTime()),
        },
      })
    );
  }
  // methods //

  // statics //
  /** @description 개별주식 정보를 5분마다 최신화하여 가져옵니다.
   * @param param0
   * @returns
   */
  static async findUnique({
    stockId,
    VTS_APPKEY,
    VTS_APPSECRET,
    VTS_TOKEN,
  }: {
    stockId: StockInfo["stockId"];
    VTS_APPKEY?: AccountInfo["appKey"];
    VTS_APPSECRET?: AccountInfo["appSecret"];
    VTS_TOKEN?: AccountInfo["apiToken"];
  }) {
    let stock = new StockInfo(
      await prisma.stockInfo.findUnique({
        where: {
          stock_id: stockId,
        },
      })
    );

    if (VTS_APPKEY == null || VTS_APPSECRET == null || VTS_TOKEN == null) {
      return stock;
    }

    let isUpdate = false;
    if (stock?.priceUpdateAt == null) {
      isUpdate = true;
    }
    // stock의 update_time이 5분 이상 지났을 경우, 주식 정보를 업데이트합니다.
    else if (stock?.priceUpdateAt) {
      const currentTime = getKoreanTime().getTime();
      const updateTime = stock.priceUpdateAt.getTime();
      const diff = currentTime - updateTime;
      if (diff > PRICE_EXPIRED_TIME) {
        isUpdate = true;
      }
    }

    if (isUpdate) {
      stock = await stock.updateInfo({ VTS_APPKEY, VTS_APPSECRET, VTS_TOKEN });
    }

    return stock;
  }

  /** @desc 보유한 주식 목록 조회 */
  static async findMany({
    where,
  }: {
    where: Prisma.StockInfoWhereInput;
  }): Promise<StockInfo[]> {
    return (await prisma.stockInfo.findMany({ where })).map(
      (data) => new StockInfo(data)
    );
  }

  // statics //
}
