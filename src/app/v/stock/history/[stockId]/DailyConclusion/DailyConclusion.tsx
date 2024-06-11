"use client";
import React from "react";

import Section from "@/components/section/Section";
import Button from "@/components/buttons/Button";
import { sixTimeToHourMinute, sixDateToYearMonthDay } from "@/lib/util/util";
import Card from "@/components/card/Card";
import Tooltip from "@/components/tooltip/Tooltip";
import DateInput from "./DateInput/DateInput";
import useDailyConclusion from "./hooks/useDailyConclusion";
import useOpenOrderDetail from "./hooks/useOpenOrderDetail";
import OrderDetail from "./OrderDetail/OrderDetail";

export type TDailyConclusionProps = {
  stockId?: string;
  orderNo?: string;
};
const DailyConclusion = (props: TDailyConclusionProps) => {
  const {
    setDateRange,
    conclusionDataList,
    summaryConclusionData,
    trCont,
    moreFetchData,
  } = useDailyConclusion(props.stockId);

  const { handleClickConclusion } = useOpenOrderDetail();

  return (
    <div className="flex flex-col gap-3">
      <Section title="주문일자">
        <DateInput setDateRange={setDateRange} />
      </Section>
      <Section
        title="주문내역"
        titleProps={{ className: "mb-5" }}
        childrenProps={{ className: "flex flex-col gap-3" }}
        notData={conclusionDataList?.length == 0}
      >
        <Section className="sticky top-16">
          <Card.Text label="총주문수량">
            <h5>{summaryConclusionData?.tot_ord_qty}주</h5>
          </Card.Text>
          <Card.Text label="총체결수량">
            <h5>{summaryConclusionData?.tot_ccld_qty}주</h5>
          </Card.Text>
          <Card.Text label="총체결금액">
            <h5>
              {Number(summaryConclusionData?.tot_ccld_amt).toLocaleString()}원
            </h5>
          </Card.Text>
          <Card.Text
            label={
              <>
                <Tooltip title="총체결금액 / 총체결수량">매입평균가격</Tooltip>
              </>
            }
          >
            <h5>
              {Math.floor(
                Number(summaryConclusionData?.pchs_avg_pric)
              ).toLocaleString()}
              원
            </h5>
          </Card.Text>
        </Section>
        {conclusionDataList?.map((data, idx) => {
          return (
            <div key={idx} onClick={() => handleClickConclusion(data)}>
              <Section>
                <small>
                  {sixDateToYearMonthDay(data.ord_dt)}{" "}
                  {sixTimeToHourMinute(data.infm_tmd)}
                </small>
                <h5>
                  {data.ord_qty}주{" "}
                  {data.sll_buy_dvsn_cd == "01" ? "매도" : "매수"}(
                  {data.tot_ccld_qty}주 체결)
                </h5>
                <Card.Text label="체결평균">{data.avg_prvs}원</Card.Text>
              </Section>
            </div>
          );
        })}
        {trCont && (trCont == "F" || trCont == "M") && (
          <Button outline onClick={moreFetchData}>
            더보기
          </Button>
        )}
      </Section>
      <OrderDetail />
    </div>
  );
};

export default DailyConclusion;
