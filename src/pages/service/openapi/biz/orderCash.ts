import { axiosPost } from "@/lib/api/helper";
import { TApiCommonReq, TApiCommonRes } from "../OpenApiService";

/** 주식주문(현금) */
export type TOrderCashReq = {
  /**계좌번호 */
  CANO: string;
  ACNT_PRDT_CD?: string;
  /**종목번호 */
  PDNO: string;
  /**주문구분(00:지정가, 01:시장가) */
  ORD_DVSN: "00" | "01";
  /**주문수량 */
  ORD_QTY: string;
  /**주문단가 */
  ORD_UNPR: string;
};
export type TOrderCashRes = {
  /** 성공실패여부(0성공, 0이외 실패) */
  rt_cd: string;
  /** 응답코드 */
  msg_cd: string;
  /** 응답메세지 */
  msg1: string;
  /** 응답상세 */
  output: {
    /**한국거래소전송주문조직번호(주문시 한국투자증권 시스템에서 지정된 영업점코드) */
    KRX_FWDG_ORD_ORGNO: string;
    /**주문번호 */
    ODNO: string;
    /**주문시각(시분초HHMMSS) */
    ORD_TMD: string;
  };
};

/** @desc 한국투자증권(주식주문(현금) API)
 *  @see https://apiportal.koreainvestment.com/apiservice/apiservice-domestic-stock-order#L_aade4c72-5fb7-418a-9ff2-254b4d5f0ceb
 */
const orderCash = async (
  headerPrm: TApiCommonReq,
  orderType: "BUY" | "SELL",
  prm: TOrderCashReq
): Promise<TOrderCashRes> => {
  const url = `${process.env.NEXT_PUBLIC_VTS_URL}/uapi/domestic-stock/v1/trading/order-cash`;
  const headerObj = {
    "content-type": "application/json",
    authorization: `Bearer ${headerPrm.VTS_TOKEN}`,
    appkey: headerPrm.VTS_APPKEY,
    appsecret: headerPrm.VTS_APPSECRET,
    tr_id: orderType === "BUY" ? "VTTC0802U" : "VTTC0801U",
  };

  const bodyObj = {
    CANO: prm.CANO.slice(0, 9),
    ACNT_PRDT_CD: prm.CANO.slice(-2),
    PDNO: prm.PDNO,
    ORD_DVSN: prm.ORD_DVSN,
    ORD_QTY: prm.ORD_QTY,
    ORD_UNPR: prm.ORD_UNPR,
  };

  const resData = await axiosPost<TOrderCashReq, TOrderCashRes>(url, bodyObj, {
    headers: headerObj,
  });

  return resData;
};

export default orderCash;
