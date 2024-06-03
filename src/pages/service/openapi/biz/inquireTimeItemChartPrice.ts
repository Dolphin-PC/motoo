import { axiosGet } from "@/lib/api/helper";
import { convertObjectToQuery } from "@/lib/util/util";
import { AccountInfo } from "@/pages/model/AccountInfo";
import { StockInfo } from "@/pages/model/StockInfo";

/** @desc 주식당일분봉조회 응답
 * @see https://apiportal.koreainvestment.com/apiservice/apiservice-domestic-stock-quotations2#L_eddbb36a-1d55-461a-b242-3067ba1e5640
 */
export type TInquireTimeItemChartPriceRes = {
  /**@desc 응답코드 (0:성공, 0 이외 실패)*/
  rt_cd: string;
  /**@desc 응답코드*/
  msg_cd: string;
  /**@desc 응답 메시지*/
  msg1: string;
  /**@desc [커스텀] 주식당일분봉조회 시간/분*/
  time?: {
    hour: string;
    minute: string;
  };
  /**@desc 응답상세1*/
  output1: {
    /**@desc 전일대비 변동가격*/
    prdy_vrss: string;
    /**@desc 전일대비 부호(?) (1:상한/2:상승/3:보합/4:하한/5:하락)*/
    prdy_vrss_sign: "1" | "2" | "3" | "4" | "5";
    /**@desc 전일대비 대비율*/
    prdy_ctrt: string;
    /**@desc 전일종가*/
    stck_prdy_clpr: string;
    /**@desc 누적거래량*/
    acml_vol: string;
    /**@desc 누적거래대금*/
    acml_tr_pbmn: string;
    /**@desc HTS 한글 종목명*/
    hts_kor_isnm: string;
    /**@desc 주식현재가*/
    stck_prpr: string;
  };
  /**@desc 응답상세2*/
  output2: {
    /**@desc 주식영업일자*/
    stck_bsop_date: string;
    /**@desc 주식체결시간*/
    stck_cntg_hour: string;
    /**@desc 주식현재가*/
    stck_prpr: string;
    /**@desc 주식시가*/
    stck_oprc: string;
    /**@desc 주식 최고가*/
    stck_hgpr: string;
    /**@desc 주식 최저가*/
    stck_lwpr: string;
    /**@desc 체결량*/
    cntg_vol: string;
    /**@desc 누적거래대금*/
    acml_tr_pbmn: string;
  }[];
};

/** @desc V_주식당일분봉조회 (1건당 30개 조회 :: 30분가량 데이터)
 * @see https://apiportal.koreainvestment.com/apiservice/apiservice-domestic-stock-quotations2#L_eddbb36a-1d55-461a-b242-3067ba1e5640
 */
const inquireTimeItemChartPrice = async ({
  VTS_TOKEN,
  VTS_APPKEY,
  VTS_APPSECRET,
  stockId,
  startTime,
}: {
  VTS_TOKEN: AccountInfo["apiToken"];
  VTS_APPKEY: AccountInfo["appKey"];
  VTS_APPSECRET: AccountInfo["appSecret"];
  stockId: StockInfo["stockId"];
  startTime: string;
}): Promise<TInquireTimeItemChartPriceRes> => {
  if (startTime.length != 6)
    throw new Error("시간 형식이 잘못되었습니다. (HHmmss)");

  const queryParameter = {
    FID_ETC_CLS_CODE: "",
    FID_COND_MRKT_DIV_CODE: "J", // J: 주식
    FID_INPUT_ISCD: stockId, // 종목번호
    FID_INPUT_HOUR_1: startTime, // 조회시작시간
    FID_PW_DATA_INCU_YN: "N", // 과거 데이터 포함 여부
  };
  const url = `${
    process.env.NEXT_PUBLIC_VTS_URL
  }/uapi/domestic-stock/v1/quotations/inquire-time-itemchartprice?${convertObjectToQuery(
    queryParameter
  )}`;
  const res = await axiosGet<TInquireTimeItemChartPriceRes>(url, {
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${VTS_TOKEN}`,
      appkey: VTS_APPKEY,
      appsecret: VTS_APPSECRET,
      tr_id: "FHKST03010200",
    },
  });

  if (res.rt_cd !== "0") throw new Error(res.msg1);

  return res;
};

export default inquireTimeItemChartPrice;
