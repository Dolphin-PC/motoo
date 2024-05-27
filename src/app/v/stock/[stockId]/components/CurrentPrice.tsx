"use client";
import Section from "@/components/section/Section";
import Tooltip from "@/components/tooltip/Tooltip";
import React, { ReactNode, useEffect } from "react";
import { currentPriceState, inquireDataState, stockIdState } from "../atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { getKoreanTime, splitDate } from "@/lib/util/util";
import { Variable } from "./Variable";

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

  if (inquireData === null) return <Section.Skeleton />;

  return (
    <div>
      <Section
        title={`${inquireData?.output1.hts_kor_isnm} (${stockId})`}
        className="sticky top-0"
      >
        <h4>{Number(currentPrice).toLocaleString()} 원</h4>
        <small>
          어제보다
          <Variable />
        </small>
        <Update />
      </Section>
    </div>
  );
};

export default CurrentPrice;
