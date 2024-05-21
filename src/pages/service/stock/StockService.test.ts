import StockService from "./StockService";

describe("StockService", () => {
  describe("getLikeStockInfoListByGroupId", () => {
    it("관심주식 특정 GroupId의 관심주식정보 목록을 가져옵니다.", async () => {
      // given
      const groupId = 1;

      // when
      const result = await StockService.getLikeStockInfoListByGroupId({
        groupId,
      });

      // then
      // XXX : TLikeStockInfo[] 타입은 toBeInstanceOf로 검증할 수 없습니다.
      //   expect(result).toBeInstanceOf(TLikeStockInfo[]);
      console.info(result);
    });

    it("AccountNumber의 그룹별 관심주식 정보를 가져옵니다.", async () => {
      // given
      const accountNumber = "1234567890";

      // when
      const result =
        await StockService.getGroupLikeStockInfoListByAccountNumber({
          accountNumber,
        });

      // then
      for (const res of result) {
        console.info(res);
      }
    });
  });
});
