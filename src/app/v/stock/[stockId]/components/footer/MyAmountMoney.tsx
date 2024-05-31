"use server";

import useAccountInfo from "@/lib/hooks/useAccountInfo";
import { AmountMoney } from "@/pages/model/AmountMoney";
import React from "react";

const MyAmountMoney = async () => {
  const accountInfo = await useAccountInfo();

  const amountMoney = await AmountMoney.findUnique({
    where: {
      account_number: accountInfo.accountNumber,
    },
  });

  return (
    <div>
      <small>
        구매가능 {Number(amountMoney.dncaTotAmt).toLocaleString()}원
      </small>
    </div>
  );
};

export default MyAmountMoney;
