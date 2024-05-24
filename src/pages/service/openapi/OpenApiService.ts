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
import axios from "axios";

// 참고 https://apiportal.koreainvestment.com/apiservice/apiservice-domestic-stock-quotations2#L_07802512-4f49-4486-91b4-1050b6f5dc9d
/** @description 한국투자증권 V_주식현재가 시세 조회 응답
 *
 */
export type TgetStockPriceRes = {
  rt_cd: string; // 0 성공, 0 이외 실패
  msg_cd: string; // 응답코드
  msg1: string; // 응답 메시지
  output: {
    stck_prpr: string; // 주식 현재가
    rprs_mrkt_kor_name: string; // 대표시장명 (ex: KOSPI200)
    bstp_kor_isnm: string; // 업종 (ex: 건설업)
    prdy_vrss: string; // 전일대비 변동가격
    prdy_vrss_sign: "1" | "2" | "3" | "4" | "5"; // 전일대비 부호 (1:상한/2:상승/3:보합/4:하한/5:하락)
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
 *
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
    /**@desc 전일대비 부호(?) (1:상한/2:상승/3:보합/4:하한/5:하락, 정확하지 않음)*/
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
      process.env.VTS
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
      `${process.env.VTS}/oauth2/tokenP`,
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
      process.env.VTS
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

    return res;
  },
};
