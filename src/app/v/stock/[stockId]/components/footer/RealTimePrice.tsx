import React from "react";
import useRealTimePrice from "./useRealTimePrice";

export default function RealTimePrice() {
  // TODO 장 시간에 테스트 할 것...
  useRealTimePrice();

  return <div>RealTimePrice</div>;
}
