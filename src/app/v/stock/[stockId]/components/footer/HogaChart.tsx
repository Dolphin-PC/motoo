"use client";
import useWebSocket from "@/lib/hooks/useWebSocket";
import { useSession } from "next-auth/react";
import React from "react";

export default function HogaChart() {
  const stockId = "005930";
  const { data: session, status } = useSession();

  const message = useWebSocket({
    stockId,
    approvalKey: session?.user?.currentAccountInfo?.approvalKey,
  });
  console.log(message);
  //   const { data: session, status } = useSession();

  //   if (status === "loading") return <div>Loading...</div>;
  //   return <div>{message}</div>;
  return <div></div>;
}
