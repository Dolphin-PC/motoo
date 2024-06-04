"use client";
import React, { useEffect, useRef, useState } from "react";
import useWebSocket, { SOCKET_STATUS } from "../useWebSocket";
import { useClientAccountInfo } from "../useClientAccountInfo";
import { decryptAES256, splitWebSocketMessage } from "@/lib/util/util";

const msgType = "H0STCNI9";

type TMessage = {
  header: {
    approval_key: string;
    custtype: "P";
    tr_type: "1" | "2";
    "content-type": "utf-8";
  };
  body: {
    input: {
      tr_id: "H0STCNI9";
      tr_key: string;
    };
  };
};

export type TRealTimeChagyulDataRes = {
  /**고객ID */
  CUST_ID: string;
  /**계좌번호 */
  ACNT_NO: string;
  /**주문번호 */
  ODER_NO: string;
  /**원주문번호 */
  OODER_NO: string;
  /**매도매수구분
   * (01 : 매도
   * 02 : 매수)*/
  SELN_BYOV_CLS: string;
  /**정정구분 */
  RCTF_CLS: string;
  /**주문종류
   * (주문통보: 주문낸 주문종류로 수신 / 체결통보: 00으로 수신
   * 00 : 지정가
   *  01 : 시장가) */
  ODER_KIND: string;
  /**주문조건 */
  ODER_COND: string;
  /**주식 단축 종목코드*/
  STCK_SHRN_ISCD: string;
  /**체결 수량
   * (체결통보(CNTG_YN=2): 체결 수량
   * 주문·정정·취소·거부 접수 통보(CNTG_YN=1): 주문수량을 의미함)*/
  CNTG_QTY: string;
  /**체결단가 */
  CNTG_UNPR: string;
  /**주식 체결 시간*/
  STCK_CNTG_HOUR: string;
  /**거부여부
   * (0 : 승인
   *  1 : 거부)
   */
  RFUS_YN: string;
  /**체결여부
   * (1 : 주문,정정,취소,거부
   *  2 : 체결 (★ 체결만 보실경우 2번만 보시면 됩니다))
   */
  CNTG_YN: string;
  /**접수여부 
   * (1 : 주문접수
      2 : 확인
      3: 취소(FOK/IOC))
  */
  ACPT_YN: string;
  /**지점번호 */
  BRNC_NO: string;
  /**주문수량 */
  ODER_QTY: string;
  /**계좌명 */
  ACNT_NAME: string;
  /**체결종목명 */
  CNTG_ISNM: string;
  /**신용구분 */
  CRDT_CLS: string;
  /**신용대출일자 */
  CRDT_LOAN_DATE: string;
  /**체결종목명40 */
  CNTG_ISNM40: string;
  /**주문가격 
   * (체결통보(CNTG_YN=2): 주문 가격
    주문·정정·취소·거부 접수 통보(CNTG_YN=1): 체결단가(빈값으로 수신)을 의미함)
  */
  ODER_PRC: string;
};
const dataToJson = (data: string): TRealTimeChagyulDataRes => {
  const dataList = data.split("^");

  const resData: TRealTimeChagyulDataRes = {
    CUST_ID: dataList[0],
    ACNT_NO: dataList[1],
    ODER_NO: dataList[2],
    OODER_NO: dataList[3],
    SELN_BYOV_CLS: dataList[4],
    RCTF_CLS: dataList[5],
    ODER_KIND: dataList[6],
    ODER_COND: dataList[7],
    STCK_SHRN_ISCD: dataList[8],
    CNTG_QTY: dataList[9],
    CNTG_UNPR: dataList[10],
    STCK_CNTG_HOUR: dataList[11],
    RFUS_YN: dataList[12],
    CNTG_YN: dataList[13],
    ACPT_YN: dataList[14],
    BRNC_NO: dataList[15],
    ODER_QTY: dataList[16],
    ACNT_NAME: dataList[17],
    CNTG_ISNM: dataList[18],
    CRDT_CLS: dataList[19],
    CRDT_LOAN_DATE: dataList[20],
    CNTG_ISNM40: dataList[21],
    ODER_PRC: dataList[22],
  };

  return resData;
};

const useRealTimeChagyul = () => {
  // 실시간체결통보에 필요한 상태
  const { message, sendMessage, socketStatus, header } = useWebSocket(msgType);
  const accountInfo = useClientAccountInfo();
  const toSendMessage = useRef<null | TMessage>(null);

  const [realTimeChagyulData, setRealTimeChagyulData] =
    useState<TRealTimeChagyulDataRes | null>(null);

  const connectSocket = () => {
    if (socketStatus !== SOCKET_STATUS.OPEN) {
      setTimeout(() => connectSocket(), 1000);
      return;
    }
    if (!accountInfo.approvalKey) throw new Error("approvalKey is null");

    toSendMessage.current = {
      header: {
        "content-type": "utf-8",
        approval_key: accountInfo.approvalKey,
        custtype: "P",
        tr_type: "1",
      },
      body: {
        input: {
          tr_id: "H0STCNI9",
          tr_key: accountInfo.htsId,
        },
      },
    };

    sendMessage(toSendMessage.current);
  };

  useEffect(() => {
    if (!message || !header) return;
    const { data } = splitWebSocketMessage(message);

    const { iv, key } = header.body.output;
    const decrypt = decryptAES256(data, key, iv);
    setRealTimeChagyulData(dataToJson(decrypt));
  }, [message]);

  /** 체결통보 결과에 따라, 주문번호에 따른 주문내역 [체결]상태 업데이트 */
  useEffect(() => {
    if (!realTimeChagyulData) return;

    // realTimeChagyulData.
  }, [realTimeChagyulData]);

  return {
    connectSocket,
    realTimeChagyulData,
  };
};

export default useRealTimeChagyul;
