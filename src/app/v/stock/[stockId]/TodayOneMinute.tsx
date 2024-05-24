"use client";
import ChartComp from "@/components/chart/Chart";
import { fetchHelperWithData } from "@/lib/api/helper";
import { sixDateToHourMinute } from "@/lib/util/util";
import { StatusCode } from "@/pages/api";
import { TInquireTimeItemChartPriceRes } from "@/pages/service/openapi/OpenApiService";
import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import colors from "tailwindcss/colors";
import { inquireDataState } from "./atom";

type TProps = {
  stockId: string;
};
const TodayOneMinute = (props: TProps) => {
  const { stockId } = props;

  const [inquireData, setInquireData] =
    useRecoilState<TInquireTimeItemChartPriceRes | null>(inquireDataState);

  /** @desc 분봉데이터 fetch함수 */
  const fetchInquireData = useCallback(async () => {
    const res = await fetchHelperWithData<
      { stockId: string },
      TInquireTimeItemChartPriceRes
    >({
      url: "/api/stock/today-one-minute",
      method: "POST",
      data: {
        stockId,
      },
    });
    if (res.status == StatusCode.SUCCESS && res.body) {
      setInquireData(res.body);
    }
  }, [stockId]);

  useEffect(() => {
    fetchInquireData();
    // const fetchInterval = setInterval(fetchInquireData, 1000 * 60);
    // return () => {
    //   clearInterval(fetchInterval);
    // };
  }, []);

  if (inquireData === null) return <div>Loading...</div>;

  return (
    <ChartComp
      option={{
        type: "line",
        data: {
          labels: inquireData.output2
            .map((v) => sixDateToHourMinute(v.stck_cntg_hour))
            .reverse(),
          datasets: [
            {
              /* 전일 종가 */
              data: Array(inquireData.output2.length).fill(
                inquireData.output1.stck_prdy_clpr
              ),
              label: "전일 종가",
              borderColor: colors.gray[100],
            },
            {
              /* 현재 가격 */
              data: inquireData.output2
                .map((v) => Number(v.stck_prpr))
                .reverse(),
              label: "현재 가격",
              cubicInterpolationMode: "monotone",
              borderColor: colors.purple[500],
              backgroundColor: colors.purple[100],
              fill: true,
            },
          ],
        },
        options: {
          scales: {
            x: {
              display: false, // x축 레이블 비활성화
            },
            y: {
              display: false, // y축 레이블 비활성화
            },
          },
        },
      }}
    />
  );
};

export default TodayOneMinute;
