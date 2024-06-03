import { axiosGet, axiosPost } from "@/lib/api/helper";
import { convertObjectToQuery } from "@/lib/util/util";
import { TIssueTokenReq, TIssueTokenRes } from "../token/TokenDao";
import { TVerifyAccount } from "@/app/v/my/account/new/page";
import { ValidationError, validateOrReject } from "class-validator";
import {
  AccountInfo,
  AccountInfoValidatorGroups,
} from "@/pages/model/AccountInfo";
import { StockInfo } from "@/pages/model/StockInfo";

/** @desc 한국투자증권 API통신을 위한 공통 파라미터 */
type TApiCommonReq = {
  VTS_TOKEN: AccountInfo["apiToken"];
  VTS_APPKEY: AccountInfo["appKey"];
  VTS_APPSECRET: AccountInfo["appSecret"];
};

/** @description 한국투자증권 V_주식현재가 시세 조회 응답
 * @see https://apiportal.koreainvestment.com/apiservice/apiservice-domestic-stock-quotations2#L_07802512-4f49-4486-91b4-1050b6f5dc9d
 */
export type TgetStockPriceRes = {
  /** 0 성공, 0 이외 실패 */
  rt_cd: string;
  /** 응답코드 */
  msg_cd: string;
  /**응답 메시지 */
  msg1: string;
  /**응답상세 */
  output: {
    /**주식 현재가 */
    stck_prpr: string;
    /**대표시장명 (ex: KOSPI200) */
    rprs_mrkt_kor_name: string;
    /**업종 (ex: 건설업) */
    bstp_kor_isnm: string;
    /**전일대비 변동가격 */
    prdy_vrss: string;
    /**전일대비 부호 (1:상한/2:상승/3:보합/4:하한/5:하락) */
    prdy_vrss_sign: "1" | "2" | "3" | "4" | "5";
    // iscd_stat_cls_code: string;
    // marg_rate: string;
    // temp_stop_yn: string;
    // oprc_rang_cont_yn: string;
    // clpr_rang_cont_yn: string;
    // crdt_able_yn: string;
    // grmn_rate_cls_code: string;
    // elw_pblc_yn: string;
    // prdy_ctrt: string;
    // acml_tr_pbmn: string;
    // acml_vol: string;
    // prdy_vrss_vol_rate: string;
    // stck_oprc: string;
    // stck_hgpr: string;
    // stck_lwpr: string;
    // stck_mxpr: string;
    // stck_llam: string;
    // stck_sdpr: string;
    // wghn_avrg_stck_prc: string;
    // hts_frgn_ehrt: string;
    // frgn_ntby_qty: string;
    // pgtr_ntby_qty: string;
    // pvt_scnd_dmrs_prc: string;
    // pvt_frst_dmrs_prc: string;
    // pvt_pont_val: string;
    // pvt_frst_dmsp_prc: string;
    // pvt_scnd_dmsp_prc: string;
    // dmrs_val: string;
    // dmsp_val: string;
    // cpfn: string;
    // rstc_wdth_prc: string;
    // stck_fcam: string;
    // stck_sspr: string;
    // aspr_unit: string;
    // hts_deal_qty_unit_val: string;
    // lstn_stcn: string;
    // hts_avls: string;
    // per: string;
    // pbr: string;
    // stac_month: string;
    // vol_tnrt: string;
    // eps: string;
    // bps: string;
    // d250_hgpr: string;
    // d250_hgpr_date: string;
    // d250_hgpr_vrss_prpr_rate: string;
    // d250_lwpr: string;
    // d250_lwpr_date: string;
    // d250_lwpr_vrss_prpr_rate: string;
    // stck_dryy_hgpr: string;
    // dryy_hgpr_vrss_prpr_rate: string;
    // dryy_hgpr_date: string;
    // stck_dryy_lwpr: string;
    // dryy_lwpr_vrss_prpr_rate: string;
    // dryy_lwpr_date: string;
    // w52_hgpr: string;
    // w52_hgpr_vrss_prpr_ctrt: string;
    // w52_hgpr_date: string;
    // w52_lwpr: string;
    // w52_lwpr_vrss_prpr_ctrt: string;
    // w52_lwpr_date: string;
    // whol_loan_rmnd_rate: string;
    // ssts_yn: string;
    // stck_shrn_iscd: string;
    // fcam_cnnm: string;
    // cpfn_cnnm: string;
    // frgn_hldn_qty: string;
    // vi_cls_code: string;
    // ovtm_vi_cls_code: string;
    // last_ssts_cntg_qty: string;
    // invt_caful_yn: string;
    // mrkt_warn_cls_code: string;
    // short_over_yn: string;
    // sltr_yn: string;
  };
};
/** @description 한국투자증권 V_주식현재가 시세 조회 요청
 * @param VTS_TOKEN     API 토큰
 * @param VTS_APPKEY    API 키
 * @param VTS_APPSECRET API 시크릿
 * @param stockId       종목코드
 */
export type TgetStockPriceReq = {
  VTS_TOKEN: string;
  VTS_APPKEY: string;
  VTS_APPSECRET: string;
  stockId: string;
};

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

export type TApprovalReq = {
  grant_type: string;
  appkey: string;
  secretkey: string;
};

export type TApprovalRes = {
  approval_key: string;
};

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
export type TInquirePsblOrderReq = {
  /**계좌번호 */
  accountNumber: AccountInfo["accountNumber"];
  /**종목번호 */
  stockId: StockInfo["stockId"];
  /**주문단가 */
  orderPrice: string;
  /**주문구분(00:지정가, 01:시장가) */
  orderType: "00" | "01";
};

export type TInquirePsblOrderRes = {
  msg1: string;
  msg_cd: string;
  rt_cd: string;
  output: {
    /**주문가능현금 */
    ord_psbl_cash: string;
    /**주문가능대용 */
    ord_psbl_sbst: string;
    /**재사용가능금액 */
    ruse_psbl_amt: string;
    /**펀드환매대금 */
    fund_rpch_chgs: string;
    /**가능수량계산단가 */
    psbl_qty_calc_unpr: string;
    /**미수없는매수금액 */
    nrcvb_buy_amt: string;
    /**미수없는매수수량 */
    nrcvb_buy_qty: string;

    /**최대매수금액 */
    max_buy_amt: string;
    /**최대매수수량 */
    max_buy_qty: string;

    /**CMA평가금액 */
    cma_evlu_amt: string;
    /**해외재사용금액원화 */
    ovrs_re_use_amt_wcrc: string;
    /**주문가능외화금액원화 */
    ord_psbl_frcr_amt_wcrc: string;
  };
};

export const OpenApiService = {
  /** @desc 주식 실시간 가격 정보 조회
   *
   * @param param0
   * @returns
   */
  getStockPrice: async ({
    VTS_TOKEN,
    VTS_APPKEY,
    VTS_APPSECRET,
    stockId,
  }: TgetStockPriceReq): Promise<TgetStockPriceRes> => {
    const fid_obj = { fid_cond_mrkt_div_code: "J", fid_input_iscd: stockId };
    const tr_id = "FHKST01010100"; // 모의투자

    const url = `${
      process.env.NEXT_PUBLIC_VTS_URL
    }/uapi/domestic-stock/v1/quotations/inquire-price?${convertObjectToQuery(
      fid_obj
    )}`;
    const res = await axiosGet<TgetStockPriceRes>(url, {
      headers: {
        contextType: "application/json",
        authorization: `Bearer ${VTS_TOKEN}`,
        appkey: VTS_APPKEY,
        appsecret: VTS_APPSECRET,
        tr_id,
      },
    });

    return res;
  },
  /** @desc 한국투자증권 API 토큰 발급
   * @param param0
   * @returns
   */
  issueApiToken: async function ({
    accountNumber,
    appKey,
    appSecret,
  }: TVerifyAccount): Promise<TIssueTokenRes> {
    const accountInfo = new AccountInfo({
      accountNumber,
      appKey,
      appSecret,
    });

    await validateOrReject(accountInfo, {
      groups: [AccountInfoValidatorGroups.verify],
    }).catch((errors: ValidationError[]) => {
      // console.log(errors);
      throw errors[0];
    });

    const res = await axiosPost<TIssueTokenReq, TIssueTokenRes>(
      `${process.env.NEXT_PUBLIC_VTS_URL}/oauth2/tokenP`,
      {
        grant_type: "client_credentials",
        appkey: accountInfo.appKey,
        appsecret: accountInfo.appSecret,
      }
    );

    res.access_token_token_expired = new Date(res.access_token_token_expired);

    return res;
  },

  /** @desc V_주식당일분봉조회 (1건당 30개 조회 :: 30분가량 데이터)
   * @see https://apiportal.koreainvestment.com/apiservice/apiservice-domestic-stock-quotations2#L_eddbb36a-1d55-461a-b242-3067ba1e5640
   */
  inquireTimeItemChartPrice: async function ({
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
  }): Promise<TInquireTimeItemChartPriceRes> {
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
  },

  /** @desc 웹소켓접속키 발급
   * @see https://apiportal.koreainvestment.com/apiservice/oauth2#L_5c87ba63-740a-4166-93ac-803510bb9c02
   */
  issueWebSocketApprovalKey: async function ({
    appKey,
    secretKey,
  }: {
    appKey: AccountInfo["appKey"];
    secretKey: AccountInfo["appSecret"];
  }) {
    const res = await axiosPost<TApprovalReq, TApprovalRes>(
      `${process.env.NEXT_PUBLIC_VTS_URL}/oauth2/Approval`,
      {
        grant_type: "client_credentials",
        appkey: appKey,
        secretkey: secretKey,
      }
    );

    return res;
  },

  /** @desc V_주식잔고조회
   * @see https://apiportal.koreainvestment.com/apiservice/apiservice-domestic-stock-order#L_66c61080-674f-4c91-a0cc-db5e64e9a5e6
   */
  inquireStockBalance: async function ({
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
  }): Promise<TInquireStockBalanceRes> {
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
  },

  /** @desc 한국투자증권(매수가능조회 API)
   * @see https://apiportal.koreainvestment.com/apiservice/apiservice-domestic-stock-order#L_806e407c-3082-44c0-9d71-e8534db5ad54
   */
  inquirePsblOrder: async function (
    headerPrm: TApiCommonReq,
    prm: TInquirePsblOrderReq
  ) {
    const baseUrl = `${process.env.NEXT_PUBLIC_VTS_URL}/uapi/domestic-stock/v1/trading/inquire-psbl-order`;
    const prmObj = {
      CANO: prm.accountNumber.slice(0, 9), // 계좌번호 앞 8자리
      ACNT_PRDT_CD: prm.accountNumber.slice(-2), // 계좌번호 뒤 2자리
      PDNO: prm.stockId, // 종목번호
      ORD_UNPR: prm.orderPrice, // 주문단가
      ORD_DVSN: prm.orderType, // 주문구분(00:지정가, 01:시장가)
      CMA_EVLU_AMT_ICLD_YN: "N", // CMA평가금액포함여부
      OVRS_ICLD_YN: "N", // 해외포함여부
    };
    const url = baseUrl + "?" + convertObjectToQuery(prmObj);

    const headerObj = {
      "content-type": "application/json",
      authorization: `Bearer ${headerPrm.VTS_TOKEN}`,
      appkey: headerPrm.VTS_APPKEY,
      appsecret: headerPrm.VTS_APPSECRET,
      tr_id: "VTTC8908R",
    };

    try {
      const resData = await axiosGet<TInquirePsblOrderRes>(url, {
        headers: headerObj,
      });

      return resData;
    } catch (error) {
      console.error(error);
    }
  },
};
