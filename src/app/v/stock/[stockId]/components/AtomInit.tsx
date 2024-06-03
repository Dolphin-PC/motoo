import { AmountStock } from "@/pages/model/AmountStock";
import React, { useCallback, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { amountStockState, inquireDataState, stockIdState } from "../atom";
import { fetchHelperWithData } from "@/lib/api/helper";
import { TInquireTimeItemChartPriceRes } from "@/pages/service/openapi/OpenApiService";
import { StatusCode } from "@/pages/api";

type TProps = {
  stockId: string;
  amountStock: AmountStock;
};

export default function AtomInit(props: TProps) {
  /**현재 보고있는 주식종목번호 */
  const setStockId = useSetRecoilState<string | null>(stockIdState);

  /**보유주식 */
  const setAmountStock = useSetRecoilState<null | AmountStock>(
    amountStockState
  );

  /**분봉데이터 */
  const setInquireData =
    useSetRecoilState<TInquireTimeItemChartPriceRes | null>(inquireDataState);

  useEffect(() => {
    setStockId(props.stockId);
    setAmountStock(props.amountStock);

    fetchInquireData();
    const fetchInterval = setInterval(fetchInquireData, 1000 * 60);
    return () => {
      clearInterval(fetchInterval);
    };
  }, []);

  /** @desc 분봉데이터 fetch함수 */
  const fetchInquireData = useCallback(async () => {
    const res = await fetchHelperWithData<
      { stockId: string },
      TInquireTimeItemChartPriceRes
    >({
      url: "/api/stock/today-one-minute",
      method: "POST",
      data: {
        stockId: props.stockId,
      },
    });
    if (res.status == StatusCode.SUCCESS && res.body) {
      setInquireData(res.body);
    }
  }, [props.stockId]);

  return <></>;
}
