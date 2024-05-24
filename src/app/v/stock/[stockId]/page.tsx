"use client";
import Section from "@/components/section/Section";
import { fetchHelperWithData } from "@/lib/api/helper";
import { StatusCode } from "@/pages/api";
import { TInquireTimeItemChartPriceRes } from "@/pages/service/openapi/OpenApiService";
import { ReactNode, useCallback, useEffect, useState } from "react";

const StockInfoPage = ({ params }: { params: { stockId: string } }) => {
  const { stockId } = params;
  const [inquireData, setInquireData] =
    useState<TInquireTimeItemChartPriceRes | null>(null);

  const fetchInquireData = useCallback(async () => {
    const res = await fetchHelperWithData<
      { stockId: string },
      TInquireTimeItemChartPriceRes
    >({
      url: "/api/stock/today-one-minute",
      method: "POST",
      data: {
        stockId,
      },
    });
    if (res.status == StatusCode.SUCCESS && res.body) {
      setInquireData(res.body);
    }
    // console.log(res);
  }, [stockId]);

  useEffect(() => {
    fetchInquireData();
    const fetchInterval = setInterval(fetchInquireData, 1000 * 60);
    return () => {
      clearInterval(fetchInterval);
    };
  }, []);

  if (!inquireData || !inquireData.output1) return <div>Loading...</div>;

  /** @desc 변동률 */
  const Variable = (): ReactNode => {
    if (inquireData?.output1) {
      let className: HTMLDivElement["className"] = "";
      switch (inquireData.output1.prdy_vrss_sign) {
        case "1":
        case "2":
          className = "text-danger-500";
          break;
        case "4":
        case "5":
          className = "text-secondary-650";
          break;
      }
      return (
        <small>
          어제보다{" "}
          <span className={`${className} font-bold`}>
            {Number(inquireData.output1.prdy_vrss).toLocaleString()}원 (
            {inquireData.output1.prdy_ctrt}%)
          </span>
        </small>
      );
    }
    return <small></small>;
  };

  /** @desc 업데이트 시간 */
  const Update = (): ReactNode => {
    if (inquireData?.time) {
      return (
        <div>
          {/* TODO Info 공통 컴포넌트 만들기 (설명 글 :: 1분마다 업데이트 된다) */}
          <small className="text-primary-300">
            Updated {inquireData.time.hour}:{inquireData.time.minute}
          </small>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <Section
        title={`${inquireData.output1.hts_kor_isnm} (${stockId})`}
        className="sticky top-0"
      >
        <h4>{Number(inquireData.output1.stck_prpr).toLocaleString()} 원</h4>
        <Variable />
        <Update />
      </Section>
      <Section title="당일 분봉">
        <div></div>
      </Section>
    </div>
  );
};

export default StockInfoPage;
