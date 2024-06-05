"use client";
import React, { useEffect, useRef, useState } from "react";
import inquireDailyConclusion, {
  TBodyRes,
  THeaderRes,
} from "./inquireDailyConclusion";
import { useClientAccountInfo } from "@/lib/hooks/useClientAccountInfo";
import { AccountInfo } from "@/model/AccountInfo";
import Section from "@/components/section/Section";
import DateInput, { TDate } from "./DateInput";
import Button from "@/components/buttons/Button";
import { sixDateToHourMinute, stringToDateString } from "@/lib/util/util";
import Card from "@/components/card/Card";
import Tooltip from "@/components/tooltip/Tooltip";

type TProps = {
  stockId?: string;
};
const DailyConclusion = (props: TProps) => {
  const accountInfo = useClientAccountInfo();
  const [conclusionDataList, setConclusionDataList] = useState<
    TBodyRes["output1"]
  >([]);
  const [summaryConclusionData, setSummaryConclusionData] =
    useState<TBodyRes["output2"]>();
  const prevFetchDataRef = useRef<TBodyRes>();
  const [trCont, setTrCont] = useState<THeaderRes["tr_cont"]>();

  const [dateRange, setDateRange] = useState<TDate>({
    startDate: new Date(),
    endDate: new Date(),
    selected: "TODAY",
  });

  useEffect(() => {
    if (accountInfo) {
      prevFetchDataRef.current = undefined;
      inquireConclusion(accountInfo).then((data) => {
        setConclusionDataList(data.output1);
        setSummaryConclusionData(data.output2);
      });
    }
  }, [accountInfo, dateRange]);

  const inquireConclusion = async (accountInfo: AccountInfo) => {
    const { fetchApi } = inquireDailyConclusion({
      accountInfo,
      query: {
        startDate: dateRange.startDate
          .toISOString()
          .split("T")[0]
          .replace(/-/g, ""),
        endDate: dateRange.endDate
          .toISOString()
          .split("T")[0]
          .replace(/-/g, ""),
        stockId: props.stockId ?? "",
        buySellDivision: "00",
        chagyulDivision: "00",
        CTX_AREA_FK100: prevFetchDataRef.current?.ctx_area_fk100 ?? "",
        CTX_AREA_NK100: prevFetchDataRef.current?.ctx_area_nk100 ?? "",
      },
    });
    const res = await fetchApi();
    if (!res.ok) {
      console.error(res);
      throw new Error("Failed to fetch data");
    }

    const tr_cont = res.headers.get("tr_cont") as THeaderRes["tr_cont"];
    setTrCont(tr_cont);

    const data = (await res.json()) as TBodyRes;
    data.output1 = data.output1.sort((a, b) => Number(a.odno) - Number(b.odno));

    data.output1.map((data) =>
      console.log(data.odno, data.ord_dt, data.ord_tmd)
    );
    prevFetchDataRef.current = data;

    return data;
  };

  const moreFetchData = async () => {
    if (!accountInfo) return;
    inquireConclusion(accountInfo).then((data) => {
      setConclusionDataList((prev) => {
        if (prev) {
          return [...prev, ...data.output1];
        }
        return data.output1;
      });
      setSummaryConclusionData(data.output2);
    });
  };

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
            <Section key={idx}>
              <small>
                {stringToDateString(data.ord_dt)}{" "}
                {sixDateToHourMinute(data.infm_tmd)}
              </small>
              <h5>
                {data.ord_qty}주{" "}
                {data.sll_buy_dvsn_cd == "01" ? "매도" : "매수"}(
                {data.tot_ccld_qty}주 체결)
              </h5>
              <Card.Text label="체결평균">{data.avg_prvs}원</Card.Text>
            </Section>
          );
        })}
        {trCont && (trCont == "F" || trCont == "M") && (
          <Button outline onClick={moreFetchData}>
            더보기
          </Button>
        )}
      </Section>
    </div>
  );
};

export default DailyConclusion;
