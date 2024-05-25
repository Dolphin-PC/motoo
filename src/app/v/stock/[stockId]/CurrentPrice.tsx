"use client";
import Section from "@/components/section/Section";
import Tooltip from "@/components/tooltip/Tooltip";
import React, { ReactNode, useEffect } from "react";
import { currentPriceState, inquireDataState, stockIdState } from "./atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { getKoreanTime, splitDate } from "@/lib/util/util";

type TProps = {
  stockId: string;
};

const CurrentPrice = (props: TProps) => {
  const [stockId, setStockId] = useRecoilState<string | null>(stockIdState);
  const currentPrice = useRecoilValue(currentPriceState);
  const inquireData = useRecoilValue(inquireDataState);

  const { hour, minute } = splitDate(getKoreanTime());

  useEffect(() => {
    setStockId(props.stockId);
  }, [props.stockId]);

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
        <Tooltip title="1분 간격으로 조회됩니다.">
          <small className="text-primary-300">
            Updated {hour}:{minute}
          </small>
        </Tooltip>
      );
    }
  };

  return (
    <Section
      title={`${inquireData?.output1.hts_kor_isnm} (${stockId})`}
      className="sticky top-0"
    >
      <h4>{Number(currentPrice).toLocaleString()} 원</h4>
      <Variable />
      <Update />
    </Section>
  );
};

export default CurrentPrice;
