import { StockInfo } from "@/model/StockInfo";
import { AccountInfo } from "@/model/AccountInfo";
import { AmountStock } from "@/model/AmountStock";
import { LikeStock } from "@/model/LikeStock";
import { StockOrderHistory } from "@/model/StockOrderHistory";
import { GroupLikeStock } from "@/model/GroupLikeStock";

export type TAmountStockInfo = AmountStock & Omit<StockInfo, "updateInfo">;
export type TLikeStockInfo = LikeStock & Omit<StockInfo, "updateInfo">;

export type TGroupLikeStockInfo = {
  id: number;
  groupName: string;
  groupPriority: number;
  accountNumber: string;
  likeStockInfoList: TLikeStockInfo[];
};

export type TStockOrderHistoryInfo = StockOrderHistory &
  Omit<StockInfo, "updateInfo"> & {
    orderTotal: number;
    conclusionTotal?: number;
  };

const StockService = {
  /** @desc 보유중인 주식/주식정보 목록을 가져옵니다.
   *
   * @param accountNumber
   * @returns
   */
  getAmountStockInfoList: async ({
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

  /** @desc 특정그룹의 관심 주식정보 목록을 가져옵니다.
   *
   * @param param0
   * @returns
   */
  getLikeStockInfoListByGroupId: async ({
    groupId,
  }: {
    groupId: GroupLikeStock["id"];
  }): Promise<TLikeStockInfo[]> => {
    const likeStockList = await LikeStock.findMany({
      where: { group_id: groupId },
    });

    const likeStockInfoList = Promise.all(
      likeStockList.map(async (likeStock) => {
        const res = await StockInfo.findUnique({ stockId: likeStock.stockId });

        return { ...likeStock, ...res };
      })
    );

    return likeStockInfoList;
  },

  /** @desc 사용자의 계좌의 [그룹 관심주식정보] 목록을 가져옵니다.
   *
   * @param param0
   * @returns
   */
  getGroupLikeStockInfoListByAccountNumber: async ({
    accountNumber,
  }: {
    accountNumber: AccountInfo["accountNumber"];
  }): Promise<TGroupLikeStockInfo[]> => {
    const groupList = await GroupLikeStock.findMany({
      where: { account_number: accountNumber },
    });

    const resultList = Promise.all(
      groupList.map(async (group) => {
        const likeStockInfoList =
          await StockService.getLikeStockInfoListByGroupId({
            groupId: group.id,
          });

        return {
          ...group,
          likeStockInfoList: likeStockInfoList,
        };
      })
    );

    return resultList;
  },

  /** @desc 주식 주문 내역을 가져옵니다.
   *
   * @param param0
   * @returns
   */
  getStockOrderHistoryList: async ({
    accountNumber,
  }: {
    accountNumber: AccountInfo["accountNumber"];
  }): Promise<TStockOrderHistoryInfo[]> => {
    const stockOrderHistoryList = await StockOrderHistory.findMany({
      where: { account_number: accountNumber },
    });

    const stockOrderHistoryInfoList: Promise<TStockOrderHistoryInfo[]> =
      Promise.all(
        stockOrderHistoryList.map(async (stockOrderHistory) => {
          const res = await StockInfo.findUnique({
            stockId: stockOrderHistory.stockId,
          });

          return {
            ...stockOrderHistory,
            ...res,
            orderTotal:
              stockOrderHistory.orderPrice * stockOrderHistory.orderQuantity,
            conclusionTotal: stockOrderHistory.conclusionPrice
              ? stockOrderHistory.conclusionPrice *
                stockOrderHistory.orderQuantity
              : undefined,
          };
        })
      );

    return stockOrderHistoryInfoList;
  },
};

export default StockService;
