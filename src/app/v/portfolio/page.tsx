import ChartComp from "@/components/chart/Chart";
import Section from "@/components/section/Section";
import TableContainer from "@/components/table/TableContainer";
import useAccountInfo from "@/lib/hooks/useAccountInfo";
import StockService from "@/pages/service/stock/StockService";
import React from "react";
import colors from "tailwindcss/colors";

const PortfolioPage = async () => {
  const { accountNumber } = await useAccountInfo();

  const amountStockInfoList = await StockService.getAmountStockInfoList({
    accountNumber: accountNumber,
  });

  const [stockPriceSum] = [
    amountStockInfoList.reduce((acc, cur) => {
      let sum = cur.price || 0 * cur.quantity;
      return acc + sum;
    }, 0),
  ];

  return (
    <div className="flex flex-col gap-10">
      <Section title="보유 주식">
        {/* TODO 변동률 추가하기 => 주문내역의 총합 - (주문가격*주식개수)의 총합 */}
        <Section.Card
          title="총 금액"
          amountUnit="KRW"
          amount={stockPriceSum}
          className="bg-primary-250"
        />
      </Section>
      <Section title="주식 비중">
        <ChartComp
          option={{
            type: "doughnut",
            data: {
              labels: amountStockInfoList.map((stock) => stock.name),
              datasets: [
                {
                  data: amountStockInfoList.map(
                    (stock) => stock.price || 0 * stock.quantity
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
    </div>
  );
};

export default PortfolioPage;
