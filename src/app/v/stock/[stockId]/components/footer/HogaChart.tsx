"use client";
import useWebSocket, { SOCKET_STATUS } from "@/lib/hooks/useWebSocket";
import { AccountInfo } from "@/pages/model/AccountInfo";
import { StockInfo } from "@/pages/model/StockInfo";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef } from "react";
import { stockIdState } from "../../atom";
import { useRecoilValue } from "recoil";
import ChartComp from "@/components/chart/Chart";
import colors from "tailwindcss/colors";
import {
  ActiveElement,
  ChartConfiguration,
  ChartData,
  ChartEvent,
} from "chart.js";
import NotData from "@/components/icon/NotData";
import { sixDateToHourMinute } from "@/lib/util/util";
import "chartjs-plugin-datalabels";
import useTimeout from "@/lib/hooks/useTimeout";

const testRes =
  "0|H0STASP0|001|005930^113019^0^77900^78000^78100^78200^78300^78400^78500^78600^78700^78800^77800^77700^77600^77500^77400^77300^77200^77100^77000^76900^265881^424306^210852^183696^185249^115895^175905^61693^73772^63546^14941^219089^328178^246894^220916^131997^140399^127233^211404^214927^1760795^1855978^0^0^0^0^344212^-77200^5^-100.00^10358640^0^10^0^0^0";

/** 실시간 호가차트 응답문자열 -> Json
 * @see https://apiportal.koreainvestment.com/apiservice/apiservice-domestic-stock-real2#L_9cda726b-6f0b-48b5-8369-6d66bea05a2a
 */
const resStringToJson = (res: string) => {
  const [code, tr_id, tr_key, data] = res.split("|");
  //   const resJson = {
  //     code: resArray[0],
  //     tr_id: resArray[1], // 모의투자
  //     tr_key: resArray[2], // ???
  //     data: resArray[3],
  //   };

  const dataList = data.split("^");

  const resData = {
    /** 유가증권 단축 종목코드 */
    MKSC_SHRN_ISCD: dataList[0],
    /** 영업시간 */
    BSOP_HOUR: dataList[1],
    /** 시간구분코드 (0:장중/A:장후예상/B:장전예상/C:9시이후의 예상가(VI발동)/D:시간외 단일가 예상) */
    HOUR_CLS_CODE: dataList[2],
    // 매도호가 1~10
    ASKP1: Number(dataList[3]),
    ASKP2: Number(dataList[4]),
    ASKP3: Number(dataList[5]),
    ASKP4: Number(dataList[6]),
    ASKP5: Number(dataList[7]),
    ASKP6: Number(dataList[8]),
    ASKP7: Number(dataList[9]),
    ASKP8: Number(dataList[10]),
    ASKP9: Number(dataList[11]),
    ASKP10: Number(dataList[12]),
    // 매수호가 1~10
    BIDP1: Number(dataList[13]),
    BIDP2: Number(dataList[14]),
    BIDP3: Number(dataList[15]),
    BIDP4: Number(dataList[16]),
    BIDP5: Number(dataList[17]),
    BIDP6: Number(dataList[18]),
    BIDP7: Number(dataList[19]),
    BIDP8: Number(dataList[20]),
    BIDP9: Number(dataList[21]),
    BIDP10: Number(dataList[22]),
    // 매도호가잔량 1~10
    ASKP_RSQN1: Number(dataList[23]),
    ASKP_RSQN2: Number(dataList[24]),
    ASKP_RSQN3: Number(dataList[25]),
    ASKP_RSQN4: Number(dataList[26]),
    ASKP_RSQN5: Number(dataList[27]),
    ASKP_RSQN6: Number(dataList[28]),
    ASKP_RSQN7: Number(dataList[29]),
    ASKP_RSQN8: Number(dataList[30]),
    ASKP_RSQN9: Number(dataList[31]),
    ASKP_RSQN10: Number(dataList[32]),
    // 매수호가잔량 1~10
    BIDP_RSQN1: Number(dataList[33]),
    BIDP_RSQN2: Number(dataList[34]),
    BIDP_RSQN3: Number(dataList[35]),
    BIDP_RSQN4: Number(dataList[36]),
    BIDP_RSQN5: Number(dataList[37]),
    BIDP_RSQN6: Number(dataList[38]),
    BIDP_RSQN7: Number(dataList[39]),
    BIDP_RSQN8: Number(dataList[40]),
    BIDP_RSQN9: Number(dataList[41]),
    BIDP_RSQN10: Number(dataList[42]),
    /**총 매도호가 잔량 */
    TOTAL_ASKP_RSQN: Number(dataList[43]),
    /**총 매수호가 잔량 */
    TOTAL_BIDP_RSQN: Number(dataList[44]),
    /**시간외 총 매도호가 잔량 */
    OVTM_TOTAL_ASKP_RSQN: Number(dataList[45]),
    /**시간외 총 매수호가 잔량 */
    OVTM_TOTAL_BIDP_RSQN: Number(dataList[46]),
    /**예상 체결가 */
    ANTC_CNPR: Number(dataList[47]),
    /**예상 체결량 */
    ANTC_CNQN: Number(dataList[48]),
    /**예상 거래량 */
    ANTC_VOL: Number(dataList[49]),
    /**예상 체결 대비 */
    ANTC_CNTG_VRSS: Number(dataList[50]),
    /**예상 체결 대비 부호 (1:상한/2:상승/3:보합/4:하한/5:하락) */
    ANTC_CNTG_VRSS_SIGN: Number(dataList[51]),
    /**예상 체결 전일 대비율 */
    ANTC_CNTG_PRDY_CTRT: Number(dataList[52]),
    /**누적 거래량 */
    ACML_VOL: Number(dataList[53]),
    /**총 매도호가 잔량 증감 */
    TOTAL_ASKP_RSQN_ICDC: Number(dataList[54]),
    /**총 매수호가 잔량 증감 */
    TOTAL_BIDP_RSQN_ICDC: Number(dataList[55]),
    /**시간외 총 매도호가 증감 */
    OVTM_TOTAL_ASKP_ICDC: Number(dataList[56]),
    /**시간외 총 매수호가 증감 */
    OVTM_TOTAL_BIDP_ICDC: Number(dataList[57]),
    /**주식 매매 구분 코드(사용X, 삭제된 값) */
    STCK_DEAL_CLS_CODE: dataList[58],
  };

  const hogaList: { price: number; buy: number; sell: number }[] = [];
  // 매도호가 (3~12)
  // 매도호가 잔량(23~32)
  for (let i = 3; i <= 12; i++) {
    if (dataList[i] === "0") continue;
    hogaList.push({
      price: Number(dataList[i]),
      buy: 0,
      sell: Number(dataList[i + 20]),
    });
  }

  // 매수호가 (13~22)
  // 매수호가 잔량(33~42)
  for (let i = 13; i <= 22; i++) {
    if (dataList[i] === "0") continue;
    hogaList.push({
      price: Number(dataList[i]),
      buy: Number(dataList[i + 20]),
      sell: 0,
    });
  }
  hogaList.sort((a, b) => b.price - a.price);

  return {
    code,
    tr_id,
    tr_key,
    data: resData,
    hogaList,
  };
};

type TMessage = {
  header: {
    approval_key: AccountInfo["approvalKey"];
    custtype: "P"; // 개인
    tr_type: "1"; // 등록
    "content-type": "utf-8";
  };
  body: {
    input: {
      tr_id: "H0STASP0"; // 실시간 호가차트
      tr_key: StockInfo["stockId"];
    };
  };
};

type TProps = {
  setPrice: (price: number) => void;
};

/** @desc 실시간 호가차트 (웹소켓)
 *  @see https://apiportal.koreainvestment.com/apiservice/apiservice-domestic-stock-real2#L_9cda726b-6f0b-48b5-8369-6d66bea05a2a
 */
const HogaChart = (props: TProps) => {
  const stockId = useRecoilValue(stockIdState);
  const { data: session } = useSession();

  const { message, sendMessage, socketStatus } = useWebSocket("H0STASP0");
  const { isTimeout, startTimer, stopTimer } = useTimeout(1000 * 5);

  // XXX: message state가 변경되면 어차피 재렌더링이 되기때문에, 굳이 state로 관리될 필요가 없음
  const chartDataRef = useRef<null | {
    data: ChartData;
    time: string;
  }>(null);

  //* 차트 설정
  const chartConfig = useRef<Omit<ChartConfiguration, "data">>({
    type: "bar",
    options: {
      onClick: (event, item) => handleClickChartBar(event, item),
      interaction: {
        intersect: false,
        mode: "y", // hover시 y축에 대한 정보만 표시
      },
      indexAxis: "y", // y축을 기준으로 데이터 표시
      elements: {},
      responsive: true,

      animation: {
        duration: 0, // 업데이트시 애니메이션 없앰
      },
      aspectRatio: 0.5,
      plugins: {
        datalabels: {
          display: (context) =>
            Number(context.dataset.data[context.dataIndex]) > 0,
          color: [colors.black],
          font: {
            weight: "bold",
          },
          anchor: "end",
          align: "bottom",
          formatter: (value, context) => value.toLocaleString(),
        },
      },
    },
  });

  const handleClickChartBar = (e: ChartEvent, itemArray: ActiveElement[]) => {
    if (itemArray.length > 0) {
      const chartElement = itemArray[0];
      const dataIndex = chartElement.index;
      const datasetIndex = chartElement.datasetIndex;

      if (chartDataRef.current == null) return;

      // const rowData =
      //   chartData.current.data.datasets[datasetIndex].data[dataIndex];

      if (chartDataRef.current.data.labels) {
        const priceLabel = chartDataRef.current.data.labels[
          dataIndex
        ] as string;

        const priceNumber = parseInt(priceLabel.replace(/,/g, ""));

        if (!isNaN(priceNumber)) {
          props.setPrice(priceNumber);
        }
      }
    }
  };

  // /** 웹소켓 메시지 보내는 구간 */
  useEffect(() => {
    if (
      session &&
      session.user.currentAccountInfo &&
      stockId &&
      socketStatus == SOCKET_STATUS.OPEN
    ) {
      const message: TMessage = {
        header: {
          approval_key: session.user.currentAccountInfo.approvalKey,
          custtype: "P",
          tr_type: "1",
          "content-type": "utf-8",
        },
        body: {
          input: {
            tr_id: "H0STASP0",
            tr_key: stockId,
          },
        },
      };
      sendMessage(message);
      startTimer();
    }
  }, [session, stockId, socketStatus]);

  // /** 웹소켓 message -> chartData로 변환하는 구간 */
  useEffect(() => {
    if (message) {
      stopTimer();
      const { code, tr_id, tr_key, data, hogaList } = resStringToJson(message);

      chartDataRef.current = {
        data: {
          labels: hogaList.map((item) => item.price.toLocaleString()),
          datasets: [
            {
              label: "매도수량",
              data: hogaList.map((item) => item.sell),
              backgroundColor: colors.blue[300],
              hidden: false,
            },
            {
              label: "매수수량",
              data: hogaList.map((item) => item.buy),
              backgroundColor: colors.red[300],
            },
          ],
        },
        time: data.BSOP_HOUR,
      };
    }
  }, [message]);

  if (isTimeout) return <NotData description="TIMEOUT" />;
  if (chartDataRef.current == null) return <NotData description="LOADING..." />;

  return (
    <div className="mb-5">
      <small>{sixDateToHourMinute(chartDataRef.current.time)}</small>
      <ChartComp.RealTime
        option={chartConfig.current}
        chartData={chartDataRef.current.data}
      />
    </div>
  );
};

export default HogaChart;
