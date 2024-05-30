import React, { useEffect, useState } from "react";
import useWebSocket, { SOCKET_STATUS } from "@/lib/hooks/useWebSocket";
import { useSession } from "next-auth/react";
import { useRecoilValue } from "recoil";
import { currentPriceState, stockIdState } from "../../atom";
import { AccountInfo } from "@/pages/model/AccountInfo";
import { StockInfo } from "@/pages/model/StockInfo";
import { Variable } from "../Variable";
import { TSign } from "@/lib/types/global";

const testRes =
  "0|H0STCNT0|001|005930^094943^74700^5^-500^-0.66^74742.79^74800^75200^74300^74700^74600^10^6768301^505885260300^12017^24143^12126^78.90^3292393^2597787^1^0.39^22.38^090021^5^-100^090948^5^-500^090248^2^400^20240530^20^N^112387^93057^504647^2969919^0.11^5590467^121.07^0^^74800";

const resStringToJson = (res: string) => {
  const [code, tr_id, tr_key, data] = res.split("|");

  const dataList = data.split("^");

  const resData = {
    /** 유가증권 단축 종목코드 */
    MKSC_SHRN_ISCD: dataList[0],
    /** 주식체결시간 */
    STCK_CNTG_HOUR: dataList[1],
    /** 주식 현재가 */
    STCK_PRPR: dataList[2],
    /** 전일대비부호 (1:상한/2:상승/3:보합/4:하한/5:하락) */
    PRDY_VRSS_SIGN: dataList[3] as TSign,
    /** 전일대비가격 */
    PRDY_VRSS: dataList[4],
    /** 전일대비율 */
    PRDY_CTRT: dataList[5],
    /** 가중평균주식가격 */
    WGHN_AVRG_STCK_PRC: dataList[6],
    /** 주식시가 */
    STCK_OPRC: dataList[7],
    /** 주식 최고가 */
    STCK_HGPR: dataList[8],
    /** 주식 최저가 */
    STCK_LWPR: dataList[9],
    /** 매도호가1 */
    ASKP1: dataList[10],
    /** 매수호가1 */
    BIDP1: dataList[11],
    /** 체결 거래량 */
    CNTG_VOL: dataList[12],
    /**누적 거래량 */
    ACML_VOL: dataList[13],
    /**누적거래대금 */
    ACML_TR_PBMN: dataList[14],
    /**매도체결건수 */
    SELN_CNTG_CSNU: dataList[15],
    /**매수체결건수 */
    SHNU_CNTG_CSNU: dataList[16],
    /**순매수 체결건수 */
    NTBY_CNTG_CSNU: dataList[17],
    /**체결강도 */
    CTTR: dataList[18],
    /**총 매도 수량 */
    SELN_CNTG_SMTN: dataList[19],
    /**총 매수 수량 */
    SHNU_CNTG_SMTN: dataList[20],
    // 여기까지만...
  };

  return resData;
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
      tr_id: "H0STCNT0"; // 실시간 체결가
      tr_key: StockInfo["stockId"];
    };
  };
};

export default function RealTimePrice() {
  const { data: session } = useSession();
  const stockId = useRecoilValue(stockIdState);
  const currentPrice = useRecoilValue(currentPriceState);

  const { message, sendMessage, socketStatus } = useWebSocket("H0STCNT0");
  const [resData, setResData] = useState<ReturnType<typeof resStringToJson>>();

  useEffect(() => {
    if (
      socketStatus != SOCKET_STATUS.OPEN ||
      !session ||
      !session.user.currentAccountInfo ||
      !stockId
    )
      return;

    const message: TMessage = {
      header: {
        approval_key: session.user.currentAccountInfo.approvalKey,
        custtype: "P",
        tr_type: "1",
        "content-type": "utf-8",
      },
      body: {
        input: {
          tr_id: "H0STCNT0",
          tr_key: stockId,
        },
      },
    };
    sendMessage(message);
  }, [session, stockId, socketStatus]);

  useEffect(() => {
    if (message) {
      setResData(resStringToJson(message));
    }
  }, [message]);

  // XXX 분봉조회 데이터는 있으나, 실시간 체결가 데이터가 없을 경우
  if (!resData)
    return (
      <div>
        <h4>{Number(currentPrice).toLocaleString()} 원</h4>
      </div>
    );
  return (
    <div>
      <h4>{Number(resData.STCK_PRPR).toLocaleString()} 원</h4>
      <Variable
        prev_price={resData.PRDY_VRSS}
        prev_rate={resData.PRDY_CTRT}
        sign={resData.PRDY_VRSS_SIGN}
      />
    </div>
  );
}
