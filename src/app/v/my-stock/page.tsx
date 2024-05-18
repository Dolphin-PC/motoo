import Button from "@/components/buttons/Button";
import ChartComp from "@/components/chart/Chart";
import Section from "@/components/section/Section";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import React from "react";
import RevenueCard from "./RevenueCard";
import TableComp from "@/components/table/Table";

const MyStockPage = async () => {
  const session = await getServerSession(authOptions);

  // TODO API
  /**
   * - 내 계좌 예수금 조회(AmountMoney)
   * - 내 계좌 주식 조회(AmountStockInfo)
   * - 내 계좌 주문 내역 조회(StockHistory)
   */

  return (
    <div className="flex flex-col gap-10">
      <Section
        title="내 계좌정보"
        right={<Button.Link href="/v/my/account"></Button.Link>}
      >
        <h4>₩ 958,000</h4>
        <p className="text-primary-500 underline">
          {session?.user.currentAccountInfo?.accountNumber}
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
                  data: [500000, 458000],
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
        <div className="flex flex-wrap justify-between">
          <Section.Card
            className="flex-1"
            amountUnit="KRW"
            amount={500000000}
            title="주식"
          />
          <Section.Card
            className="flex-1"
            amountUnit="KRW"
            amount={5000000}
            title="현금"
          />
        </div>
      </Section>

      <Section title="수익 현황">
        <RevenueCard />
      </Section>

      <Section title="주문 내역">
        <TableComp />
      </Section>
    </div>
  );
};

export default MyStockPage;
