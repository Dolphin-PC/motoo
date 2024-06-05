"use client";
import React, { ReactNode, useEffect, useMemo, useReducer } from "react";
import { getKoreanTime, splitDate } from "@/lib/util/util";
import Button from "@/components/buttons/Button";

export type TDate = {
  selected: "TODAY" | "1WEEK" | "1MONTH" | "3MONTH" | "ALL";
  startDate: Date;
  endDate: Date;
};
type TAction = {
  type: TDate["selected"];
  payload: string;
};

const ONE_DAY = 24 * 60 * 60 * 1000;

type TProps = {
  setDateRange: (date: TDate) => void;
};
const DateInput = (props: TProps): ReactNode => {
  const currentDate = useMemo(() => getKoreanTime(), []);

  const dateReducer = (state: TDate, action: TAction): TDate => {
    if (action.type === state.selected) return state;
    switch (action.type) {
      case "TODAY":
        return {
          selected: "TODAY",
          startDate: currentDate,
          endDate: currentDate,
        };

      case "1WEEK":
        return {
          selected: "1WEEK",
          startDate: new Date(currentDate.getTime() - 7 * ONE_DAY),
          endDate: currentDate,
        };
      case "1MONTH":
        return {
          selected: "1MONTH",
          startDate: new Date(currentDate.getTime() - 30 * ONE_DAY),
          endDate: currentDate,
        };
      case "3MONTH":
        return {
          selected: "3MONTH",
          startDate: new Date(currentDate.getTime() - 90 * ONE_DAY),
          endDate: currentDate,
        };
      case "ALL":
        return {
          selected: "ALL",
          startDate: new Date(0),
          endDate: currentDate,
        };
    }
    return state;
  };

  const [dateState, dispatchDate] = useReducer(dateReducer, {
    selected: "TODAY",
    startDate: currentDate,
    endDate: currentDate,
  });

  useEffect(() => {
    props.setDateRange(dateState);
  }, [dateState]);

  const handleDateButton = (type: TDate["selected"]) => {
    dispatchDate({ type, payload: type });
  };

  const { selected, startDate, endDate } = dateState;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-5 items-center">
        <div>
          <small>시작일</small>
          <h5>{startDate.toISOString().split("T")[0]}</h5>
        </div>
        <small>~</small>
        <div>
          <small>종료일</small>
          <h5>{endDate.toISOString().split("T")[0]}</h5>
        </div>
      </div>
      <hr />
      <div className="flex gap-3">
        <Button
          onClick={() => handleDateButton("TODAY")}
          primary={selected == "TODAY"}
        >
          오늘
        </Button>
        <Button
          onClick={() => handleDateButton("1WEEK")}
          primary={selected == "1WEEK"}
        >
          1주일
        </Button>
        <Button
          onClick={() => handleDateButton("1MONTH")}
          primary={selected == "1MONTH"}
        >
          1개월
        </Button>
        <Button
          onClick={() => handleDateButton("3MONTH")}
          primary={selected == "3MONTH"}
        >
          3개월
        </Button>
        <Button
          onClick={() => handleDateButton("ALL")}
          primary={selected == "ALL"}
        >
          전체
        </Button>
      </div>
    </div>
  );
};

export default DateInput;
