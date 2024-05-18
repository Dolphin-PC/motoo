import { StockInfo } from "@/pages/model/StockInfo";
import { prisma } from "../prismaClient";
import { PRICE_EXPIRED_TIME } from "@/lib/common";
import {
  OpenApiService,
  TgetStockPriceReq,
  getStockPrice,
} from "../openapi/OpenApiService";
import { AccountInfo } from "@/pages/model/AccountInfo";
import { AccountService } from "../account/AccountService";
import { StockOrderHistory } from "@/pages/model/StockOrderHistory";
import { AmountStock } from "@/pages/model/AmountStock";
import { LikeStock } from "@/pages/model/LikeStock";

export type TAmountStockInfo = AmountStock & StockInfo;
export type TLikeStockInfo = LikeStock & StockInfo;

const StockService = {
  /** @desc 개별주식 정보를 5분마다 최신화하여 가져옵니다.
   *
   */
  getStockInfo: async ({
    stockId,
    VTS_APPKEY,
    VTS_APPSECRET,
    VTS_TOKEN,
  }: {
    stockId: string;
    VTS_APPKEY?: string;
    VTS_APPSECRET?: string;
    VTS_TOKEN?: string;
  }): Promise<StockInfo> => {
    let stock = await prisma.stockInfo.findFirst({
      where: {
        stock_id: stockId,
      },
    });

    if (VTS_APPKEY == null || VTS_APPSECRET == null || VTS_TOKEN == null)
      return StockInfo.from(stock);

    let isUpdate = false;

    if (stock?.price_update_at == null) {
      isUpdate = true;
    }
    // stock의 update_time이 5분 이상 지났을 경우, 주식 정보를 업데이트합니다.
    else if (stock?.price_update_at) {
      const currentTime = new Date().getTime();
      const updateTime = stock.price_update_at.getTime();
      const diff = currentTime - updateTime;
      if (diff > PRICE_EXPIRED_TIME) {
        isUpdate = true;
      }
    }

    if (isUpdate) {
      const newStockInfo = await OpenApiService.getStockPrice({
        VTS_TOKEN,
        VTS_APPKEY,
        VTS_APPSECRET,
        stockId,
      });
      stock = await prisma.stockInfo.update({
        where: {
          stock_id: stockId,
        },
        data: {
          price: parseInt(newStockInfo.output.stck_prpr),
          price_update_at: new Date(),
        },
      });
    }

    return StockInfo.from(stock);
  },

  /** @desc account에 보유중인 주식/주식정보 목록을 가져옵니다.
   *
   * @param accountNumber
   * @returns
   */
  getStockList: async ({
    accountNumber,
  }: {
    accountNumber: AccountInfo["accountNumber"];
  }): Promise<TAmountStockInfo[]> => {
    const accountInfo = await AccountService.getAccountInfo(accountNumber);
    if (accountInfo == null) throw new Error("계좌 정보를 찾을 수 없습니다.");

    const stockList = await AccountService.getOwnStockList(
      accountInfo.accountNumber
    );

    const stockInfoList = Promise.all(
      stockList.map(async (stock) => {
        const res = await StockService.getStockInfo({
          stockId: stock.stockId,
          VTS_TOKEN: accountInfo.apiToken!,
          VTS_APPKEY: accountInfo.appKey,
          VTS_APPSECRET: accountInfo.appSecret,
        });

        return { ...stock, ...res };
      })
    );

    return stockInfoList;
  },

  /** @desc 주식 주문 내역을 가져옵니다.
   *
   * @param param0
   * @returns
   */
  getStockHistory: async ({
    accountNumber,
  }: {
    accountNumber: AccountInfo["accountNumber"];
  }) => {
    const list = await prisma.stockOrderHistory.findMany({
      where: {
        account_number: accountNumber,
      },
    });

    return list.map((data) => StockOrderHistory.from(data));
  },

  /** @desc 관심 주식 목록을 가져옵니다.
   *
   * @param param0
   * @returns
   */
  getLikeStockList: async ({
    accountNumber,
  }: {
    accountNumber: AccountInfo["accountNumber"];
  }): Promise<TLikeStockInfo[]> => {
    const likeStockList = await prisma.likeStock.findMany({
      where: {
        account_number: accountNumber,
      },
    });

    const likeStockInfoList = Promise.all(
      likeStockList.map(async (likeStock) => {
        const res = await StockService.getStockInfo({
          stockId: likeStock.stock_id,
        });

        return { ...LikeStock.from(likeStock), ...res };
      })
    );

    return likeStockInfoList;
  },
};

export default StockService;
