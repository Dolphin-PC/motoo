import { AccountInfo } from "@/pages/model/AccountInfo";
import { TApiCommonReq } from "../OpenApiService";
import { axiosPost } from "@/lib/api/helper";

export type TOrderDivision = "00" | "01";
/** 주식주문(정정취소) */
export type TCancelOrderReq = {
  /**계좌번호 */
  CANO: string;
  ACNT_PRDT_CD?: string;
  /** 한국거래소전송주문조직번호(공란) */
  KRX_FWDG_ORD_ORGNO: "";
  /** 원주문번호 */
  ORGN_ODNO: string;
  /** 주문구분 */
  ORD_DVSN: TOrderDivision;
  /** 정정취소구분코드(정정:01, 취소:02) */
  RVSE_CNCL_DVSN_CD: "01" | "02";
  /**
   * 잔량전부 "0" & QTY_ALL_ORD_YN "Y"설정
   */
  ORD_QTY: string;
  /**
   * 주문단가 (취소:"0", 정정가)
   */
  ORD_UNPR: string;
  /** 잔량전부주문여부 */
  QTY_ALL_ORD_YN: "Y" | "N";
};
export type TCancelOrderRes = {};

/** @desc 주문 정정/취소
 */
const cancelOrder = async (
  headerPrm: TApiCommonReq,
  prm: {
    /**구분코드 */
    cancelType: "CANCEL" | "REVISE";
    /**잔량전부주문여부 */
    isAllOrder: "Y" | "N";
    /**계좌번호 */
    CANO: AccountInfo["accountNumber"];
    /**원주문번호 */
    ORGN_ODNO: string;
    /**주문구분(00지정가, 01시장가) */
    ORD_DVSN: TOrderDivision;
    /**주문수량 */
    ORD_QTY: number;
    /**정정단가 */
    ORD_UNPR: number;
  }
) => {
  const url = `${process.env.NEXT_PUBLIC_VTS_URL}/uapi/domestic-stock/v1/trading/order-rvsecncl`;

  let RVSE_CNCL_DVSN_CD: TCancelOrderReq["RVSE_CNCL_DVSN_CD"];
  let QTY_ALL_ORD_YN: TCancelOrderReq["QTY_ALL_ORD_YN"];
  let ORD_UNPR: TCancelOrderReq["ORD_UNPR"];
  let ORD_QTY: TCancelOrderReq["ORD_QTY"];

  // 정정취소구분코드(정정:01, 취소:02)
  if (prm.cancelType === "REVISE") {
    RVSE_CNCL_DVSN_CD = "01";
  } else {
    RVSE_CNCL_DVSN_CD = "02";
    ORD_UNPR = "0";
  }

  // 잔량전부주문여부
  if (prm.isAllOrder === "Y") {
    ORD_QTY = "0";
    QTY_ALL_ORD_YN = "Y";
  } else {
    if (prm.ORD_QTY < 0) throw new Error("주문수량이 1 이상이어야 합니다.");
    ORD_QTY = String(prm.ORD_QTY);
    QTY_ALL_ORD_YN = "N";
  }

  // 주문구분(정정 & 지정가 -> 주문단가 필수)
  if (prm.cancelType === "REVISE" && prm.ORD_DVSN === "00") {
    if (prm.ORD_UNPR < 0) throw new Error("주문단가가 0 이상이어야 합니다.");
    ORD_UNPR = String(prm.ORD_UNPR);
  } else {
    ORD_UNPR = "0";
  }

  const bodyObj: TCancelOrderReq = {
    CANO: prm.CANO.slice(0, 9),
    ACNT_PRDT_CD: prm.CANO.slice(-2),
    ORGN_ODNO: prm.ORGN_ODNO,
    ORD_DVSN: prm.ORD_DVSN,
    RVSE_CNCL_DVSN_CD,
    ORD_QTY,
    ORD_UNPR,
    QTY_ALL_ORD_YN,
    KRX_FWDG_ORD_ORGNO: "",
  };

  const resData = await axiosPost<TCancelOrderReq, TCancelOrderRes>(
    url,
    bodyObj,
    {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${headerPrm.VTS_TOKEN}`,
        appkey: headerPrm.VTS_APPKEY,
        appsecret: headerPrm.VTS_APPSECRET,
        tr_id: "VTTC0803U",
      },
    }
  );

  return resData;
};

export default cancelOrder;
