"use client";
import useWebSocket from "@/lib/hooks/useWebSocket";
import { AccountInfo } from "@/pages/model/AccountInfo";
import { StockInfo } from "@/pages/model/StockInfo";
import { useSession } from "next-auth/react";
import React from "react";

type TMessage = {
  header: {
    approval_key: AccountInfo["approvalKey"];
    custtype: "P"; // 개인
    tr_type: "1"; // 등록
    "content-type": "utf-8";
  };
  body: {
    input: {
      tr_id: "H0STASP0"; // 모의투자 전용
      tr_key: StockInfo["stockId"];
    };
  };
};

export default function HogaChart() {
  const stockId = "005930";
  const { data: session, status } = useSession();

  const { message, sendMessage } = useWebSocket();

  const handleClick = () => {
    if (session && session.user.currentAccountInfo?.approvalKey) {
      sendMessage<TMessage>({
        header: {
          approval_key: session.user.currentAccountInfo.approvalKey,
          custtype: "P",
          tr_type: "1",
          "content-type": "utf-8",
        },
        body: {
          input: {
            tr_id: "H0STASP0",
            tr_key: stockId,
          },
        },
      });
    }
  };
  console.log(message);
  //   const { data: session, status } = useSession();

  //   if (status === "loading") return <div>Loading...</div>;
  //   return <div>{message}</div>;
  return <button onClick={handleClick}>SEND</button>;
}
