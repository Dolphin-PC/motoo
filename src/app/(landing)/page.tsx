import Button from "@/components/buttons/Button";
import Card from "@/components/card/Card";
import Section from "@/components/section/Section";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex flex-col gap-10 p-5">
      <Section className="">
        <div className="">
          <h2>모투</h2>
          <br />
          <p>
            &apos;우리 모두 투자하자&apos;
            <br />
            모투서비스는 투자시장에 입문하려는 분들을 위해, 모의로 투자해보며
            증권시장을 체험하는 서비스입니다.
          </p>

          <div className="flex gap-2 pt-4 ">
            <Link href="/v/main">
              <Button primary>시작하기</Button>
            </Link>
            <Button outline>알아보기</Button>
          </div>
        </div>
      </Section>

      <Section className="flex flex-col gap-3 pb-20" title="서비스 기능">
        <p>
          별도의 프로그램을 개발하지 않아도, 모투서비스로 투자경험을 느낄 수
          있어요.
        </p>

        <div className="flex flex-col gap-5">
          <Card
            img_src="/images/highfive.png"
            title="간편한 모의투자 경험"
            desc={
              <>
                <p>
                  한국투자증권의 모의투자 API서비스를 활용하여, 실제 주식시장과
                  동일한 기능을 제공합니다.
                </p>
              </>
            }
          />
          <Card
            img_src="/images/stock_buy_sell.png"
            title="주식 매수/매도"
            desc="실제 주식가격에 따라 매수/매도 주문이 가능해요."
          />
          <Card
            img_src="/images/portfolio.png"
            title="실시간 차트/호가"
            desc={
              <>
                <p>실시간 주식차트와 호가를 확인하며, 투자를 결정하세요.</p>
                <small>정규장 시간(09:00~15:30)에만 제공</small>
              </>
            }
          />
          {/* <Card
            img_src="/images/highfive.png"
            title="투자수익 보고서"
            desc="모의투자 기간이 종료된 이후,
            내가 투자한 주식의 수익률을 확인해보세요."
            buttons={[
              <Button key="1" outline>
                Learn More
              </Button>,
            ]}
          /> */}
        </div>
      </Section>

      <Section title="시작하기">
        <div className="flex flex-col gap-5">
          <p>
            모투의 기능을 이용하기 위해서는
            <br />
            <span className="font-bold">한국투자증권에서 발급받은 KEY</span>가
            필요해요.
          </p>
          <Link
            href="https://apiportal.koreainvestment.com/howto-use"
            target="_blank"
          >
            <Button primary>한국투자증권 이용안내</Button>
          </Link>
          <Link href="/v/main">
            <Button primary>시작하기</Button>
          </Link>
        </div>
      </Section>
    </div>
  );
}
