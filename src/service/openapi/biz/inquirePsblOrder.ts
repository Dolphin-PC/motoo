import { convertObjectToQuery } from "@/lib/util/util";
import { axiosGet } from "@/lib/api/helper";
import { AccountInfo } from "@/model/AccountInfo";
import { StockInfo } from "@/model/StockInfo";
import { TApiCommonReq } from "../OpenApiService";

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

/** @desc 한국투자증권(매수가능조회 API)
 * @see https://apiportal.koreainvestment.com/apiservice/apiservice-domestic-stock-order#L_806e407c-3082-44c0-9d71-e8534db5ad54
 */
const inquirePsblOrder = async (
  headerPrm: TApiCommonReq,
  prm: TInquirePsblOrderReq
) => {
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
};

export default inquirePsblOrder;
