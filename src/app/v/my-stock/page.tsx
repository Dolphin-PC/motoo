import Button from "@/components/buttons/Button";
import ChartComp from "@/components/chart/Chart";
import Section from "@/components/section/Section";
import RevenueCard from "./RevenueCard";
import { AmountMoney } from "@/pages/model/AmountMoney";
import useAccountInfo from "@/lib/hooks/useAccountInfo";
import StockService from "@/pages/service/stock/StockService";
import TableContainer from "@/components/table/TableContainer";

const MyStockPage = async () => {
  const accountInfo = await useAccountInfo();

  const amountMoney = await AmountMoney.findUnique({
    where: { account_number: accountInfo.accountNumber },
  });
  const amountStockInfoList = await StockService.getAmountStockInfoList({
    accountNumber: accountInfo.accountNumber,
  });
  const stockOrderHistoryList = await StockService.getStockOrderHistoryList({
    accountNumber: accountInfo.accountNumber,
  });

  const stockPriceQuantitySum = amountStockInfoList.reduce(
    (acc, cur) => acc + cur.price * cur.quantity,
    0
  );

  return (
    <div className="flex flex-col gap-10">
      <Section
        title="내 계좌정보"
        right={<Button.Link href="/v/my/account"></Button.Link>}
      >
        <h4>₩ {amountMoney.krw}</h4>
        <p className="text-primary-500 underline">
          {accountInfo.accountNumber}
        </p>
      </Section>
      <Section title="자산현황">
        <ChartComp
          option={{
            type: "doughnut",
            data: {
              labels: ["주식", "현금"],
              datasets: [
                {
                  data: [stockPriceQuantitySum, amountMoney.krw],
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
            amount={amountMoney.krw}
            title="현금"
          />
        </div>
      </Section>

      <Section title="수익 현황">
        <RevenueCard stockOrderHistoryList={stockOrderHistoryList} />
      </Section>

      <Section title="주문 내역">
        <TableContainer
          tableName="/v/my-stock_stockOrderHistoryList"
          dataList={stockOrderHistoryList}
        />
      </Section>
    </div>
  );
};

export default MyStockPage;
