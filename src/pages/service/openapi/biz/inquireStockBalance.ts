import { axiosGet } from "@/lib/api/helper";
import { convertObjectToQuery } from "@/lib/util/util";
import { AccountInfo } from "@/pages/model/AccountInfo";

export type TInquireStockBalanceRes = {
  /** 연속조회검색조건100	 */
  ctx_area_fk100: string;
  /** 연속조회키100 */
  ctx_area_nk100: string;
  /** 응답상세1 */
  output1: {
    /** 상품번호 */
    pdno: string;
    /** 상품명 */
    prdt_name: string;
    /** 매매구분명 */
    trad_dvsn_name: string;
    /** 전일매수수량 */
    bfdy_buy_qty: string;
    /** 전일매도수량 */
    bfdy_sll_qty: string;
    /** 금일매수수량 */
    thdt_buyqty: string;
    /** 금일매도수량 */
    thdt_sll_qty: string;
    /** 보유수량 */
    hldg_qty: string;
    /** 주문가능수량 */
    ord_psbl_qty: string;
    /** 매입평균가격 */
    pchs_avg_pric: string;
    /** 매입금액 */
    pchs_amt: string;
    /** 현재가 */
    prpr: string;
    /** 평가금액 */
    evlu_amt: string;
    /** 평가손익금액 */
    evlu_pfls_amt: string;
    /** 평가손익율 */
    evlu_pfls_rt: string;
    /** 평가수익율(미사용항목) */
    evlu_erng_rt: string;
    /** 대출일자 */
    loan_dt: string;
    /** 대출금액 */
    loan_amt: string;
    /** 대주대각매금 */
    stln_slng_chgs: string;
    /** 만기일자 */
    expd_dt: string;
    /** 등락율 */
    fltt_rt: string;
    /** 전일대비증감 */
    bfdy_cprs_icdc: string;
    /** 종목증거금율명 */
    item_mgna_rt_name: string;
    /** 보증금율명 */
    grta_rt_name: string;
    /** 대용가격 */
    sbst_pric: string;
    /** 주식대출단가 */
    stck_loan_unpr: string;
  }[];
  /** 응답상세2 */
  output2: {
    /** 예수금총액 */
    dnca_tot_amt: string;
    /** 익일정산금액(D+1예수금) */
    nxdy_excc_amt: string;
    /** 가수도정산금액(D+2예수금) */
    prvs_rcdl_excc_amt: string;
    /** CMA평가금액 */
    cma_evlu_amt: string;
    /** 전일매수금액 */
    bfdy_buy_amt: string;
    /** 금일매수금액 */
    thdt_buy_amt: string;
    /** 전일매도금액 */
    bfdy_sll_amt: string;
    /** 금일매도금액 */
    thdt_sll_amt: string;
    /** 유가평가금액 */
    scts_evlu_amt: string;
    /** 총평가금액 */
    tot_evlu_amt: string;
    /** 순자산금액 */
    nass_amt: string;
    /** 매입금액합계금액 */
    pchs_amt_smtl_amt: string;
    /** 평가금액합계금액 */
    evlu_amt_smtl_amt: string;
    /** 평가손익합계금액 */
    evlu_pfls_smtl_amt: string;
    /** 전일총자산평가금액 */
    bfdy_tot_asst_evlu_amt: string;
    /** 자산증감액 */
    asst_icdc_amt: string;

    /** 익일자동상환금액 */
    nxdy_auto_rdpt_amt: string;
    /** D+2자동상환금액 */
    d2_auto_rdpt_amt: string;
    /** 전일제비용금액 */
    bfdy_tlex_amt: string;
    /** 금일제비용금액 */
    thdt_tlex_amt: string;
    /** 총대출금액 */
    tot_loan_amt: string;
    /** 융자금자동상환여부 */
    fncg_gld_auto_rdpt_yn: string;
    /** 총대주매각대금 */
    tot_stln_slng_chgs: string;
    /** 자산증감수익율(데이터미제공) */
    asst_icdc_erng_rt: string;
  }[];
  /** @desc 성공실패여부 (0성공, 0이외실패) */
  rt_cd: string;
  msg_cd: string;
  msg1: string;
};

/** @desc V_주식잔고조회
 * @see https://apiportal.koreainvestment.com/apiservice/apiservice-domestic-stock-order#L_66c61080-674f-4c91-a0cc-db5e64e9a5e6
 */
const inquireStockBalance = async ({
  accountNumber,
  VTS_TOKEN,
  appkey,
  appsecret,
  CTX_AREA_FK100,
  CTX_AREA_NK100,
}: {
  accountNumber: AccountInfo["accountNumber"];
  VTS_TOKEN: AccountInfo["apiToken"];
  appkey: AccountInfo["appKey"];
  appsecret: AccountInfo["appSecret"];
  CTX_AREA_FK100?: string;
  CTX_AREA_NK100?: string;
}): Promise<TInquireStockBalanceRes> => {
  const baseUrl = `${process.env.NEXT_PUBLIC_VTS_URL}/uapi/domestic-stock/v1/trading/inquire-balance`;
  const headerObj = {
    authorization: `Bearer ${VTS_TOKEN}`,
    appkey,
    appsecret,
    tr_id: "VTTC8434R", // 모의 투자
  };
  const ParamObj = {
    CANO: accountNumber, // 계좌번호 체계의 앞 8자리
    ACNT_PRDT_CD: accountNumber.slice(-2), // 계좌번호 체계의 뒤 2자리
    AFHR_FLPR_YN: "N", // 시간외 단일가 여부
    OFL_YN: "", // 공란
    INQR_DVSN: "01", // 조회구분 01 : 대출일별 02 : 종목별
    UNPR_DVSN: "01", // 단가구분 01 : 기본값
    FUND_STTL_ICLD_YN: "N", // 펀드결제분포함여부 N : 포함하지 않음 Y : 포함
    FNCG_AMT_AUTO_RDPT_YN: "N", // 융자금액자동상환여부 N : 기본값
    PRCS_DVSN: "00", // 처리구분 00 : 전일매매포함 01 : 전일매매미포함
    CTX_AREA_FK100: CTX_AREA_FK100 ?? "", // 공란 : 최초 조회시 이전 조회 Output CTX_AREA_FK100 값 : 다음페이지 조회시(2번째부터)
    CTX_AREA_NK100: CTX_AREA_NK100 ?? "", // 공란 : 최초 조회시 이전 조회 Output CTX_AREA_NK100 값 : 다음페이지 조회시(2번째부터)
  };

  const url = `${baseUrl}?${convertObjectToQuery(ParamObj)}`;

  const res = await axiosGet<TInquireStockBalanceRes>(url, {
    headers: headerObj,
  });

  return res;
};

export default inquireStockBalance;
