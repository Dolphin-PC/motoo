import { StockInfo } from "@/pages/model/StockInfo";
import { AccountInfo } from "@/pages/model/AccountInfo";
import { AmountStock } from "@/pages/model/AmountStock";
import { LikeStock } from "@/pages/model/LikeStock";

export type TAmountStockInfo = AmountStock & Omit<StockInfo, "updateInfo">;
export type TLikeStockInfo = LikeStock & Omit<StockInfo, "updateInfo">;

const StockService = {
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
    const accountInfo = await AccountInfo.findFirst({
      where: { account_number: accountNumber },
      isConfirm: true,
    });
    if (accountInfo == null) throw new Error("계좌 정보를 찾을 수 없습니다.");

    const amountStockList = await AmountStock.findMany({
      where: { account_number: accountNumber },
    });

    const amountStockInfoList: TAmountStockInfo[] = await Promise.all(
      amountStockList.map(async (amountStock) => {
        const stockInfo = await StockInfo.findUnique({
          stockId: amountStock.stockId,
          VTS_APPKEY: accountInfo.appKey,
          VTS_APPSECRET: accountInfo.appSecret,
          VTS_TOKEN: accountInfo.apiToken,
        });
        return { ...amountStock, ...stockInfo };
      })
    );

    return amountStockInfoList;
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
    const likeStockList = await LikeStock.findMany({
      where: { account_number: accountNumber },
    });

    const likeStockInfoList = Promise.all(
      likeStockList.map(async (likeStock) => {
        const res = await StockInfo.findUnique({ stockId: likeStock.stockId });

        return { ...likeStock, ...res };
      })
    );

    return likeStockInfoList;
  },
};

export default StockService;
