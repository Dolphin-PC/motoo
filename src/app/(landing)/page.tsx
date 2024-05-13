import Button from "@/components/buttons/Button";
import Card from "@/components/card/Card";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex flex-col gap-10">
      <h1>Home</h1>

      <section className="">
        <div className="">
          <h2>모투</h2>
          <br />
          <p>
            &apos;우리 모두 투자하자&apos;
            <br />
            모투서비스는 투자시장에 입문하려는 분들을 위해, 모의로 투자해보며
            증권시장을 체험하는 서비스입니다.
          </p>

          <div className="pt-4 flex gap-2">
            <Link href="/v/main">
              <Button className="p-2">시작하기</Button>
            </Link>
            <Button outline={true} className="p-2">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-3 pb-20">
        <h3>서비스 기능</h3>
        <p>
          Do consectetur proident proident id eiusmod deserunt consequat
          pariatur ad ex velit do Lorem reprehenderit.
        </p>

        <div className="flex flex-col gap-5">
          <Card
            img_src="/images/stock_buy_sell.png"
            title="주식 매수/매도"
            desc="Dolore officia eiusmod cupidatat aute d"
            buttons={[
              <Button key="1" outline>
                Learn More
              </Button>,
            ]}
          />
          <Card
            img_src="/images/portfolio.png"
            title="포트폴리오"
            desc="Adipisicing labore ea nulla dolor et ad ad quis proident laboris"
            buttons={[
              <Button key="1" outline>
                Learn More
              </Button>,
            ]}
          />
          <Card
            img_src="/images/stock_report.png"
            title="투자수익 보고서"
            desc="모의투자 기간이 종료된 이후,
            내가 투자한 주식의 수익률을 확인해보세요."
            buttons={[
              <Button key="1" outline>
                Learn More
              </Button>,
            ]}
          />
        </div>
      </section>
    </div>
  );
}
