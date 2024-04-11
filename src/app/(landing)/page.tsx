import Button from "@/components/Button";
import Card from "@/components/Card";
import Logo from "@/components/icon/Logo";
import Header from "@/components/layout/Header";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-5">
      <section
        className="
          md:flex
        "
      >
        <div
          className="
          md:w-6/12 md:pt-32 md:pr-32
          sm:w-full 
        "
        >
          <h1>모투</h1>
          <br />
          <p>
            &apos;우리 모두 투자하자&apos;
            <br />
            모투서비스는 투자시장에 입문하려는 분들을 위해, 모의로 투자해보며
            증권시장을 체험하는 서비스입니다.
          </p>

          <div className="pt-4 flex gap-2">
            <Button className="p-7 pt-3 pb-3">시작하기</Button>
            <Button outline={true} className="p-7 pt-3 pb-3">
              Learn More
            </Button>
          </div>
        </div>
        <div
          className="
            md:w-6/12 
            sm:w-full
          "
        >
          <Image
            src="/assets/images/main_image.png"
            alt="main"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </section>

      <section className="flex flex-col justify-center items-center gap-3">
        <h2>서비스 기능</h2>
        <p>
          Do consectetur proident proident id eiusmod deserunt consequat
          pariatur ad ex velit do Lorem reprehenderit.
        </p>

        <div className="flex gap-5">
          <Card
            img_src="/assets/images/stock_buy_sell.png"
            title="주식 매수/매도"
            desc="Dolore officia eiusmod cupidatat aute d"
            buttons={[
              <Button key="1" outline>
                Learn More
              </Button>,
            ]}
          />
          <Card
            img_src="/assets/images/portfolio.png"
            title="포트폴리오"
            desc="Adipisicing labore ea nulla dolor et ad ad quis proident laboris"
            buttons={[
              <Button key="1" outline>
                Learn More
              </Button>,
            ]}
          />
          <Card
            img_src="/assets/images/stock_report.png"
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
