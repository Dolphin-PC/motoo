import Button from "@/components/buttons/Button";
import ChartComp from "@/components/chart/Chart";
import Section from "@/components/section/Section";
import useAccountInfo from "@/lib/hooks/useAccountInfo";
import StockService from "@/pages/service/stock/StockService";
import colors from "tailwindcss/colors";
import Init from "./Init";
import RecoilContainer from "@/components/container/RecoilContainer";
import "chartjs-plugin-datalabels";

const MainPage = async () => {
  const { accountNumber } = await useAccountInfo();

  let [stockPriceSum, stockSellRevenueSum, stockOrderCount, stockWaitCount] = [
    0, 0, 0, 0,
  ];

  // 보유 주식
  const stockInfoList = await StockService.getAmountStockInfoList({
    accountNumber: accountNumber,
  });
  stockPriceSum = stockInfoList.reduce((acc, cur) => {
    let sum = (cur.price || 0) * cur.quantity;
    return acc + sum;
  }, 0);
  // 보유 주식

  // 관심 종목
  // const likeStockInfoList = await StockService.getLikeStockInfoList({
  //   accountNumber: accountNumber,
  // });
  // 관심 종목

  // TODO: 주식주문 내역

  // const stockHistory = await StockOrderHistory.findMany({
  //   where: {
  //     account_number: accountNumber,
  //   },
  // });
  // for (const history of stockHistory) {
  //   // 판매수익, [판매] && [완료] && [체결가격이 존재]
  //   if (
  //     history.orderType == 0 &&
  //     history.orderStatus == 2 &&
  //     history.conclusionPrice
  //   ) {
  //     let sum = history.conclusionPrice - history.orderPrice;
  //     stockSellRevenueSum += sum * history.orderQuantity;
  //   }

  //   // 대기중인 주문
  //   if (history.orderStatus == 0) {
  //     stockWaitCount++;
  //   }
  // }
  // stockOrderCount = stockHistory.length;
  // 주식주문 내역

  return (
    <div className="flex flex-col gap-10">
      <RecoilContainer>
        <Init />
      </RecoilContainer>
      {/* 내 주식 */}
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
            href="/v/my-stock"
          />
          <Section.Card
            className="bg-primary-250 w-8/12"
            title="판매수익"
            amountUnit="KRW"
            amount={stockSellRevenueSum}
            href="/v/my-stock"
          />
          {/* <Section.Card
            className="bg-secondary-250 w-8/12"
            title="주문내역"
            amountUnit="건"
            amount={stockOrderCount}
            href="/v/main"
          /> */}
          <Section.Card
            className="bg-info-250 w-8/12"
            title="대기중인 주문"
            amountUnit="건"
            amount={stockWaitCount}
            href="/v/main"
          />
        </Section.Scroll>
      </div>

      {/* 내 포트폴리오 */}
      <Section
        title="내 포트폴리오 TOP 5"
        right={<Button.Link href="/v/my-stock"></Button.Link>}
        notData={stockInfoList.length == 0}
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
                    .map((stock) => (stock.price || 0) * stock.quantity),
                  backgroundColor: Object.values(colors.purple)
                    .reverse()
                    .slice(4),
                },
              ],
            },
            options: {
              interaction: {
                intersect: false,
                mode: "point",
                axis: "r",
              },
              plugins: {
                legend: {
                  display: true,
                  position: "right",
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
                    .map((stock) => (stock.price || 0) * stock.quantity),
                  backgroundColor: Object.values(colors.purple)
                    .reverse()
                    .slice(4),
                },
              ],
            },
            options: {
              indexAxis: "y",
              interaction: {
                axis: "y",
              },
              plugins: {
                legend: {
                  display: false,
                },
              },
            },
          }}
        />
      </Section>

      {/* 관심 종목 : like_stock에 [그룹]모델 추가로, 여기서는 삭제 */}
      {/* <Section
        title="관심 종목"
        right={<Button.Link href="/v/like-stock"></Button.Link>}
      >
        <TableContainer
          tableName="/v/main_likeStockList"
          dataList={likeStockInfoList}
        />
      </Section> */}
    </div>
  );
};

export default MainPage;
