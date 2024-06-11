"use client";
import React from "react";
import { useRecoilValue } from "recoil";
import { orderDetailState } from "./atom";
import BottomSheet from "@/components/bottomSheet/BottomSheet";
import Section from "@/components/section/Section";
import Card from "@/components/card/Card";
import { sixDateToYearMonthDay, sixTimeToHourMinute } from "@/lib/util/util";

const OrderDetail = () => {
  const conclusionData = useRecoilValue(orderDetailState);

  if (!conclusionData) return null;

  const 주문구분 = conclusionData.sll_buy_dvsn_cd === "01" ? "판매" : "구매";
  const 주문상태 =
    conclusionData.ord_qty == conclusionData.tot_ccld_qty ? "완료" : "중";

  const 주문일 = sixDateToYearMonthDay(conclusionData.ord_dt);
  const 주문시각 = sixTimeToHourMinute(conclusionData.ord_tmd);
  const 체결시각 = sixTimeToHourMinute(conclusionData.infm_tmd);

  return (
    <BottomSheet title="주문 상세내역" openStateKey="orderDetail">
      <Section title="종목명">
        <h4>
          {conclusionData.prdt_name} ({conclusionData.pdno})
        </h4>
        <small>주문번호 : {conclusionData.odno}</small>
      </Section>

      <Section childrenProps={{ className: "flex flex-col gap-5" }}>
        <header>
          <h5>
            {주문구분} {주문상태}
          </h5>
          <small>{체결시각 && 주문일 + " " + 체결시각}</small>
        </header>
        <hr />
        <Section
          title="주문"
          titleProps={{ className: "mb-5" }}
          childrenProps={{ className: "flex flex-col gap-5" }}
        >
          <Card.Text label={`${주문구분} 단가`}>
            <h5>{Number(conclusionData.ord_unpr).toLocaleString()}원</h5>
          </Card.Text>
          <Card.Text label={`${주문구분} 수량`}>
            <h5>{conclusionData.ord_qty}주</h5>
          </Card.Text>
          <Card.Text label={`${주문구분} 시간`}>
            <h5>{주문시각}</h5>
          </Card.Text>
          <Card.Text label={`${주문구분} 유형`}>
            <h5>{conclusionData.ord_dvsn_name}</h5>
          </Card.Text>
        </Section>

        <Section
          title="체결"
          titleProps={{ className: "mb-5" }}
          childrenProps={{ className: "flex flex-col gap-5" }}
        >
          <Card.Text label={`${주문구분} 단가`}>
            <h5>{Number(conclusionData.avg_prvs).toLocaleString()}원</h5>
          </Card.Text>
          <Card.Text label={`${주문구분} 수량`}>
            <h5>{conclusionData.tot_ccld_qty}주</h5>
          </Card.Text>
          <Card.Text label={`${주문구분} 금액`}>
            <h5>{Number(conclusionData.tot_ccld_amt).toLocaleString()}원</h5>
          </Card.Text>
          <Card.Text label={`${주문구분} 시간`}>
            <h5>{체결시각}</h5>
          </Card.Text>
        </Section>
      </Section>
    </BottomSheet>
  );
};

export default OrderDetail;
