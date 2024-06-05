"use client";

import { useClientAccountInfo } from "@/lib/hooks/useClientAccountInfo";
import { convertObjectToQuery } from "@/lib/util/util";
import { AccountInfo } from "@/model/AccountInfo";
import {
  CommonHeader,
  TApiCommonReq,
  TApiCommonRes,
} from "@/service/openapi/OpenApiService";

type TQueryParam = {
  /**종합계좌번호
   * (계좌번호 체계(8-2)의 앞 8자리) */
  CANO: string;
  /**계좌상품코드
   * (계좌번호 체계(8-2)의 뒤 2자리)
   */
  ACNT_PRDT_CD: string;
  /**조회시작일자
   * (YYYYMMDD)
   */
  INQR_STRT_DT: string;
  /**조회종료일자
   * (YYYYMMDD)
   */
  INQR_END_DT: string;
  /**매도매수구분코드
   * 00 : 전체
   * 01 : 매도
   * 02 : 매수
   */
  SLL_BUY_DVSN_CD: "00" | "01" | "02";
  /**조회구분
   * 00 : 역순
   * 01 : 정순
   */
  INQR_DVSN: "00" | "01";
  /**상품번호
   * 종목번호(6자리)
   * 공란 : 전체 조회
   */
  PDNO: string;
  /**체결구분
   * 00 : 전체
   * 01 : 체결
   * 02 : 미체결
   */
  CCLD_DVSN: "00" | "01" | "02";

  /**주문채번지점번호
   * "" (Null 값 설정)
   */
  ORD_GNO_BRNO: "";
  /**주문번호
   * "" (Null 값 설정)
   */
  ODNO: "";
  /**조회구분3
   * 00 : 전체
   * 01 : 현금
   * 02 : 융자
   * 03 : 대출
   * 04 : 대주
   */
  INQR_DVSN_3: "00" | "01" | "02" | "03" | "04";

  /**조회구분1
   * 공란 : 전체
   * 1 : ELW
   * 2 : 프리보드
   */
  INQR_DVSN_1: "" | "1" | "2";

  /**연속조회검색조건100
   * 공란 : 최초 조회시
   * 이전 조회 Output CTX_AREA_FK100 값 : 다음페이지 조회시(2번째부터)
   */
  CTX_AREA_FK100: string;
  /**연속조회키100
   * 공란 : 최초 조회시
   * 이전 조회 Output CTX_AREA_NK100 값 : 다음페이지 조회시(2번째부터)
   */
  CTX_AREA_NK100: string;
};

export type THeaderRes = {
  tr_id: string;
  /** 연속거래여부
   * F/M : 다음데이터 있음
   * D/E : 다음데이터 없음*/
  tr_cont: "F" | "M" | "D" | "E";
};

export type TBodyRes = TApiCommonRes & {
  msg1: string;
  ctx_area_fk100: string;
  ctx_area_nk100: string;
  output1: {
    /**주문일자(8) */
    ord_dt: string;
    /**주문번호(10) */
    odno: string;
    /**원주문번호(10) */
    orgn_odno: string;
    /**주문구분명(60) */
    ord_dvsn_name: string;
    /** 매도/매수 (01매도, 02매수)*/
    sll_buy_dvsn_cd: "01" | "02";
    /**종목번호(6) */
    pdno: string;
    /**종목명 */
    prdt_name: string;
    /**주문수량(10) */
    ord_qty: string;
    /**주문단가(10) */
    ord_unpr: string;
    /**주문시각(6) */
    ord_tmd: string;
    /** 총체결수량 */
    tot_ccld_qty: string;
    /** 체결평균가 */
    avg_prvs: string;
    /** 취소여부 */
    cncl_yn: string;
    /** 총체결금액 */
    tot_ccld_amt: string;
    /**주문구분코드
     * 00 지정가
     * 01 시장가
     */
    ord_dvsn_cd: string;
    /**취소확인수량 */
    cncl_cfrm_qty: string;
    /**잔여수량 */
    rmn_qty: string;
    /**거부수량 */
    rjct_qty: string;
    /**통보시각(6) */
    infm_tmd: string;
  }[];
  output2: {
    /**총주문수량
     * 미체결주문수량 + 체결수량 (취소주문제외)
     */
    tot_ord_qty: string;
    /**총체결수량 */
    tot_ccld_qty: string;
    /**매입평균가격
     * 총체결금액 / 총체결수량
     */
    pchs_avg_pric: string;
    /**총체결금액 */
    tot_ccld_amt: string;
  };
};

type TParam = {
  /** 연속조회여부 */
  accountInfo: AccountInfo;
  tr_cont?: string;
  query: {
    startDate: string;
    endDate: string;
    /** 매도매수구분 (00전체 01매도 02매수) */
    buySellDivision: TQueryParam["SLL_BUY_DVSN_CD"];
    stockId: string;
    /**체결구분
     * 00 : 전체
     * 01 : 체결
     * 02 : 미체결
     */
    chagyulDivision: TQueryParam["CCLD_DVSN"];
    CTX_AREA_FK100?: TQueryParam["CTX_AREA_FK100"];
    CTX_AREA_NK100?: TQueryParam["CTX_AREA_NK100"];
  };
};

/** @desc 주식일별주문체결조회
 * @see https://apiportal.koreainvestment.com/apiservice/apiservice-domestic-stock-order#L_bc51f9f7-146f-4971-a5ae-ebd574acec12
 */
const inquireDailyConclusion = (prm: TParam) => {
  const { appKey, appSecret, apiToken, accountNumber } = prm.accountInfo;

  const baseUrl = `/uapi/domestic-stock/v1/trading/inquire-daily-ccld`;

  const headerObj = {
    ...CommonHeader({
      VTS_APPKEY: appKey,
      VTS_APPSECRET: appSecret,
      VTS_TOKEN: apiToken,
    }),
    tr_id: "VTTC8001R",
  };

  const queryObj: TQueryParam = {
    CANO: accountNumber.slice(0, 8),
    ACNT_PRDT_CD: accountNumber.slice(-2),
    INQR_STRT_DT: prm.query.startDate,
    INQR_END_DT: prm.query.endDate,
    SLL_BUY_DVSN_CD: prm.query.buySellDivision,
    INQR_DVSN: "00",
    PDNO: prm.query.stockId,
    CCLD_DVSN: prm.query.chagyulDivision,
    ORD_GNO_BRNO: "",
    ODNO: "",
    INQR_DVSN_3: "00",
    INQR_DVSN_1: "",
    CTX_AREA_FK100: prm.query.CTX_AREA_FK100 || "",
    CTX_AREA_NK100: prm.query.CTX_AREA_NK100 || "",
  };

  const url = baseUrl + "?" + convertObjectToQuery(queryObj);
  // console.log("headerObj", headerObj);
  // console.log("queryObj", queryObj);
  // console.log("url", url);

  const fetchApi = () => {
    return fetch(url, {
      method: "get",
      headers: headerObj,
    });
  };
  return {
    fetchApi,
  };
};

export default inquireDailyConclusion;
