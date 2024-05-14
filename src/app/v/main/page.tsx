// "use client";
import Button from "@/components/buttons/Button";
import ChartComp from "@/components/chart/Chart";
import Section from "@/components/section/Section";
import TableComp from "@/components/table/Table";
import colors from "tailwindcss/colors";

const MainPage = () => {
  return (
    <div className="flex flex-col gap-10">
      <Section.Scroll
        title="내 주식"
        className=""
        right={<Button.Link href="/v/my-stock"></Button.Link>}
      >
        <Section.Card
          className="bg-primary-250 w-8/12"
          title="보유주식"
          amountUnit="KRW"
          amount={152000}
          href="/v/main"
        />
        <Section.Card
          className="bg-primary-250 w-8/12"
          title="판매수익"
          amountUnit="KRW"
          amount={60000}
          href="/v/main"
        />
        <Section.Card
          className="bg-secondary-250 w-8/12"
          title="주문내역"
          amountUnit="건"
          amount={13}
          href="/v/main"
        />
        <Section.Card
          className="bg-info-250 w-8/12"
          title="대기중인 주문"
          amountUnit="건"
          amount={2}
          href="/v/main"
        />
      </Section.Scroll>

      <Section
        title="내 포트폴리오 TOP 5"
        right={<Button.Link href="/v/portfolio"></Button.Link>}
      >
        <ChartComp
          option={{
            type: "doughnut",
            data: {
              labels: ["January", "February", "March", "April", "May"],
              datasets: [
                {
                  data: [65, 59, 80, 81, 56],
                  backgroundColor: Object.values(colors.purple),
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
              labels: ["January", "February", "March", "April", "May"],
              datasets: [
                {
                  data: [65, 59, 80, 81, 56],
                  backgroundColor: Object.values(colors.purple),
                },
              ],
            },
            options: {
              indexAxis: "y",
              plugins: {
                legend: {
                  position: "bottom",
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
        <TableComp />
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
