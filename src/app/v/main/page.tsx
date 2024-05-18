// "use client";
import Button from "@/components/buttons/Button";
import ChartComp from "@/components/chart/Chart";
import Section from "@/components/section/Section";
import TableComp from "@/components/table/Table";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { LikeStock } from "@/pages/model/LikeStock";
import CommonService from "@/pages/service/common/CommonService";
import StockService, {
  TAmountStockInfo,
} from "@/pages/service/stock/StockService";
import { getServerSession } from "next-auth";
import colors from "tailwindcss/colors";

const MainPage = async () => {
  const session = await getServerSession(authOptions);

  const likeStockTableHeader = CommonService.getTableHeader(
    "/v/main_likeStockList"
  );

  const accountNumber = session?.user.currentAccountInfo?.accountNumber;

  let stockInfoList: TAmountStockInfo[] = [];
  let likeStockList: LikeStock[] = [];
  let [stockPriceSum, stockSellRevenueSum, stockOrderCount, stockWaitCount] = [
    0, 0, 0, 0,
  ];

  if (accountNumber) {
    // 보유 주식
    stockInfoList = await StockService.getStockList({
      accountNumber: accountNumber,
    });
    stockPriceSum = stockInfoList.reduce((acc, cur) => {
      let sum = cur.price * cur.quantity;
      return acc + sum;
    }, 0);

    // 주식주문 내역
    const stockHistory = await StockService.getStockHistory({
      accountNumber: accountNumber,
    });
    for (const history of stockHistory) {
      // 판매수익, [판매] && [완료] && [체결가격이 존재]
      if (
        history.orderType == 0 &&
        history.orderStatus == 2 &&
        history.conclusionPrice
      ) {
        let sum = history.conclusionPrice - history.orderPrice;
        stockSellRevenueSum += sum * history.orderQuantity;
      }

      // 대기중인 주문
      if (history.orderStatus == 0) {
        stockWaitCount++;
      }
    }
    stockOrderCount = stockHistory.length;

    // 관심 종목
    likeStockList = await StockService.getLikeStockList({
      accountNumber: accountNumber,
    });
  }

  // console.log(likeStockList);

  return (
    <div className="flex flex-col gap-10">
      <div style={{ height: "20vh" }}>
        <Section.Scroll
          title="내 주식"
          className="h-full"
          right={<Button.Link href="/v/my-stock"></Button.Link>}
        >
          <Section.Card
            className="bg-primary-250 w-8/12"
            title="보유주식"
            amountUnit="KRW"
            amount={stockPriceSum}
            href="/v/main"
          />
          <Section.Card
            className="bg-primary-250 w-8/12"
            title="판매수익"
            amountUnit="KRW"
            amount={stockSellRevenueSum}
            href="/v/main"
          />
          <Section.Card
            className="bg-secondary-250 w-8/12"
            title="주문내역"
            amountUnit="건"
            amount={stockOrderCount}
            href="/v/main"
          />
          <Section.Card
            className="bg-info-250 w-8/12"
            title="대기중인 주문"
            amountUnit="건"
            amount={stockWaitCount}
            href="/v/main"
          />
        </Section.Scroll>
      </div>

      <Section
        title="내 포트폴리오 TOP 5"
        right={<Button.Link href="/v/portfolio"></Button.Link>}
      >
        <ChartComp
          option={{
            type: "doughnut",
            data: {
              labels: stockInfoList.slice(0, 5).map((stock) => stock.name),
              datasets: [
                {
                  data: stockInfoList
                    .slice(0, 5)
                    .map((stock) => stock.price * stock.quantity),
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
        <ChartComp
          option={{
            type: "bar",
            data: {
              labels: stockInfoList.slice(0, 5).map((stock) => stock.name),
              datasets: [
                {
                  data: stockInfoList
                    .slice(0, 5)
                    .map((stock) => stock.price * stock.quantity),
                  backgroundColor: Object.values(colors.purple)
                    .reverse()
                    .slice(4),
                },
              ],
            },
            options: {
              indexAxis: "y",
              plugins: {
                legend: {
                  display: false,
                },
              },
            },
          }}
        />
      </Section>

      <Section
        title="관심 종목"
        right={<Button.Link href="/v/like-stock"></Button.Link>}
      >
        <TableComp headerObj={likeStockTableHeader} dataList={likeStockList} />
      </Section>
      {/* <Section
        title="최근 본 주식"
        right={<Button.Link href="/v/main"></Button.Link>}
      >
        <TableComp />
      </Section> */}
    </div>
  );
};

export default MainPage;
