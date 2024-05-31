import InnerLayout from "@/components/layout/InnerLayout";
import useAccountInfo from "@/lib/hooks/useAccountInfo";
import { StockInfo } from "@/pages/model/StockInfo";

import React from "react";
import ClientContainer from "./ClientContainer";
import { AmountStock } from "@/pages/model/AmountStock";
import Button from "@/components/buttons/Button";
import { isEmpty } from "@/lib/util/util";

type LayoutProps = {
  params: { stockId: string };
};
const StockIdPage = async (props: LayoutProps) => {
  const { stockId } = props.params;

  const accountInfo = await useAccountInfo();

  const stockInfo = await StockInfo.findUnique({
    stockId,
    VTS_APPKEY: accountInfo.appKey,
    VTS_APPSECRET: accountInfo.appSecret,
    VTS_TOKEN: accountInfo.apiToken,
  });

  // XXX SSC -> CSC로 데이터를 전달하기 위해서는 plain object로 변환해야 합니다.
  const amountStock = Object.assign(
    {},
    await AmountStock.findUnique({
      where: {
        stock_id_account_number: {
          account_number: accountInfo.accountNumber,
          stock_id: stockId,
        },
      },
    })
  );

  return (
    <InnerLayout title={stockInfo.name}>
      <ClientContainer stockId={stockId} amountStock={amountStock} />
    </InnerLayout>
  );
};

export default StockIdPage;
