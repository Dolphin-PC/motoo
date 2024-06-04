import Button from "@/components/buttons/Button";
import ChartComp from "@/components/chart/Chart";
import Section from "@/components/section/Section";
import React from "react";
import RevenueCard from "./RevenueCard";
import { AmountMoney } from "@/pages/model/AmountMoney";
import useAccountInfo from "@/lib/hooks/useAccountInfo";
import StockService from "@/pages/service/stock/StockService";
import TableContainer from "@/components/table/TableContainer";
import colors from "tailwindcss/colors";

const MyStockPage = async () => {
  const accountInfo = await useAccountInfo();

  const amountMoney = await AmountMoney.findUnique({
    where: { account_number: accountInfo.accountNumber },
  });
  const amountStockInfoList = await StockService.getAmountStockInfoList({
    accountNumber: accountInfo.accountNumber,
  });

  //TODO 교체
  const stockOrderHistoryList = await StockService.getStockOrderHistoryList({
    accountNumber: accountInfo.accountNumber,
  });

  const stockPriceQuantitySum = amountStockInfoList.reduce(
    (acc, cur) => acc + (cur.price || 0) * cur.quantity,
    0
  );

  return (
    <div className="flex flex-col gap-10">
      {/* 내 계좌정보 */}
      <Section
        title="예수금 총액"
        right={<Button.Link href="/v/my/account"></Button.Link>}
      >
        <h4>₩ {Number(amountMoney.dncaTotAmt).toLocaleString()}</h4>
        <small className="text-primary-500 underline">
          계좌번호 {accountInfo.accountNumber}
        </small>
      </Section>

      {/* 자산현황 */}
      <Section title="자산현황" notData={amountStockInfoList.length == 0}>
        <ChartComp
          option={{
            type: "doughnut",
            data: {
              labels: ["주식", "현금"],
              datasets: [
                {
                  data: [stockPriceQuantitySum, Number(amountMoney.dncaTotAmt)],
                  backgroundColor: ["#FF6384", "#36A2EB"],
                },
              ],
            },
            options: {
              plugins: {
                legend: {
                  position: "right",
                },
              },
            },
          }}
        />
        <div className="">
          <Section.Card
            className="flex-1"
            amountUnit="KRW"
            amount={stockPriceQuantitySum}
            title="주식"
          />
          <Section.Card
            className="flex-1"
            amountUnit="KRW"
            amount={Number(amountMoney.dncaTotAmt)}
            title="현금"
          />
        </div>
      </Section>

      {/* 주식 비중 */}
      <Section title="주식 비중" notData={amountStockInfoList.length == 0}>
        <ChartComp
          option={{
            type: "doughnut",
            data: {
              labels: amountStockInfoList.map((stock) => stock.name),
              datasets: [
                {
                  data: amountStockInfoList.map(
                    (stock) => (stock.price || 0) * stock.quantity
                  ),
                  backgroundColor: Object.values(colors.purple)
                    .reverse()
                    .slice(4),
                },
              ],
            },
            options: {
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            },
          }}
        />
        <TableContainer
          tableName="/v/portfolio_amountStockInfoList"
          dataList={amountStockInfoList}
        />
      </Section>

      {/* 수익 현황 */}
      <Section title="수익 현황">
        <RevenueCard stockOrderHistoryList={stockOrderHistoryList} />
      </Section>

      <Section title="주문 내역" notData={stockOrderHistoryList.length == 0}>
        <TableContainer
          tableName="/v/my-stock_stockOrderHistoryList"
          dataList={stockOrderHistoryList}
        />
      </Section>
    </div>
  );
};

export default MyStockPage;
