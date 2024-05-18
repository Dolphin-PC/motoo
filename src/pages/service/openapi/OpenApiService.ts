import { axiosGet } from "@/lib/api/helper";
import { convertObjectToQuery } from "@/lib/util/util";

// 참고 https://apiportal.koreainvestment.com/apiservice/apiservice-domestic-stock-quotations2#L_07802512-4f49-4486-91b4-1050b6f5dc9d
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
/** @description 한국투자증권 V_주식현재가 시세 조회
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
export const getStockPrice = async ({
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
};

export const OpenApiService = {
  getStockPrice,
};
