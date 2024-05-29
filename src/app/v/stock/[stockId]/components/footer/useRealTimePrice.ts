"use client";
import useWebSocket, { SOCKET_STATUS } from "@/lib/hooks/useWebSocket";
import { AccountInfo } from "@/pages/model/AccountInfo";
import { StockInfo } from "@/pages/model/StockInfo";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { stockIdState } from "../../atom";

type TMessage = {
  header: {
    approval_key: AccountInfo["approvalKey"];
    custtype: "P"; // 개인
    tr_type: "1"; // 등록
    "content-type": "utf-8";
  };
  body: {
    input: {
      tr_id: "H0STCNT0"; // 실시간 체결가
      tr_key: StockInfo["stockId"];
    };
  };
};

/**한국투자증권 - 실시간 체결가 */
export default function useRealTimePrice() {
  const { data: session } = useSession();

  const [price, setPrice] = useState<number>(0);
  const stockId = useRecoilValue(stockIdState);

  const { message, sendMessage, socketStatus } = useWebSocket();

  useEffect(() => {
    if (
      socketStatus != SOCKET_STATUS.OPEN ||
      !session ||
      !session.user.currentAccountInfo ||
      !stockId
    )
      return;

    const message: TMessage = {
      header: {
        approval_key: session.user.currentAccountInfo.approvalKey,
        custtype: "P",
        tr_type: "1",
        "content-type": "utf-8",
      },
      body: {
        input: {
          tr_id: "H0STCNT0",
          tr_key: stockId,
        },
      },
    };
    sendMessage(message);
  }, [session, stockId, socketStatus]);

  useEffect(() => {
    if (message) {
      console.log("실시간 체결가", message);
    }
  }, [message]);

  // 가격 정보 업데이트
}
