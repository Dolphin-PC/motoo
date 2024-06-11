"use client";
import { useEffect, useRef, useState } from "react";

import { useClientAccountInfo } from "@/lib/hooks/useClientAccountInfo";
import { AccountInfo } from "@/model/AccountInfo";
import inquireDailyConclusion, {
  TBodyRes,
  THeaderRes,
} from "../inquireDailyConclusion";
import { TDate } from "../DateInput/DateInput";

const useDailyConclusion = (stockId?: string) => {
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
        stockId: stockId ?? "",
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

  return {
    setDateRange,
    conclusionDataList,
    summaryConclusionData,
    trCont,
    moreFetchData,
  };
};

export default useDailyConclusion;
