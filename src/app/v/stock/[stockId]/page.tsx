import InnerLayout from "@/components/layout/InnerLayout";
import useAccountInfo from "@/lib/hooks/useAccountInfo";
import { StockInfo } from "@/pages/model/StockInfo";

import React from "react";
import ClientContainer from "./ClientContainer";
import { AmountStock } from "@/pages/model/AmountStock";
import Button from "@/components/buttons/Button";

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
        account_number: accountInfo.accountNumber,
        stock_id: stockId,
      },
    })
  );

  return (
    <InnerLayout title={stockInfo.name}>
      <ClientContainer stockId={stockId} amountStock={amountStock} />
      <footer className="flex flex-row gap-3 p-3 sticky bottom-0  z-20 bg-white shadow-up">
        <Button primary className="w-full">
          매수
        </Button>
        <Button outline className="w-full">
          매도
        </Button>
      </footer>
    </InnerLayout>
  );
};

export default StockIdPage;
