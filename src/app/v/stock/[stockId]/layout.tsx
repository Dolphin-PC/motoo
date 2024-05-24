import InnerLayout from "@/components/layout/InnerLayout";
import useAccountInfo from "@/lib/hooks/useAccountInfo";
import { StockInfo } from "@/pages/model/StockInfo";

import React from "react";

type LayoutProps = {
  params: { stockId: string };
  children: React.ReactNode;
};
const layout = async (props: LayoutProps) => {
  const { stockId } = props.params;

  const accountInfo = await useAccountInfo();

  const stockInfo = await StockInfo.findUnique({
    stockId,
    VTS_APPKEY: accountInfo.appKey,
    VTS_APPSECRET: accountInfo.appSecret,
    VTS_TOKEN: accountInfo.apiToken,
  });

  return <InnerLayout title={stockInfo.name}>{props.children}</InnerLayout>;
};

export default layout;
