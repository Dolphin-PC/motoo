"use client";
import ChartComp from "@/components/chart/Chart";
import { sixTimeToHourMinute } from "@/lib/util/util";
import { useRecoilValue } from "recoil";
import colors from "tailwindcss/colors";
import { inquireDataState, stockIdState } from "../atom";
import Section from "@/components/section/Section";
import NotData from "@/components/icon/NotData";
import { TInquireTimeItemChartPriceRes } from "@/service/openapi/biz/inquireTimeItemChartPrice";

const TodayOneMinute = () => {
  const inquireData = useRecoilValue<TInquireTimeItemChartPriceRes | null>(
    inquireDataState
  );

  if (inquireData === null) return <NotData description="LOADING..." />;
  return (
    <Section title="차트(30분)">
      <ChartComp
        option={{
          type: "line",
          data: {
            labels: inquireData.output2
              .map((v) => sixTimeToHourMinute(v.stck_cntg_hour))
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
            plugins: {
              title: {
                display: true,
                text: `${inquireData.time?.hour}:${inquireData.time?.minute} 기준`,
                align: "end",
              },
            },
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
    </Section>
  );
};

export default TodayOneMinute;
