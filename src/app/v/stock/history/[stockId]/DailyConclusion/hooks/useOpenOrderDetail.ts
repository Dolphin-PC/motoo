import { TConclusionData } from "../inquireDailyConclusion";
import { useSetRecoilState } from "recoil";
import { orderDetailState } from "../OrderDetail/atom";
import { bottomSheetOpenState } from "@/components/bottomSheet/atom";
import { useRef } from "react";

const useOpenOrderDetail = () => {
  const setConclusion = useSetRecoilState(orderDetailState);
  const setIsOpen = useSetRecoilState(bottomSheetOpenState("orderDetail"));
  const redirectRef = useRef(false);

  const setOrderDetailData = (data: TConclusionData): void => {
    setConclusion(data);
    setIsOpen(true);
  };

  const setOrderDetailByRedirect = (
    dataList: TConclusionData[],
    orderNo?: string
  ) => {
    if (!orderNo || redirectRef.current == true) return;

    redirectRef.current = true;

    const data = dataList.find((data) => data.odno === orderNo);
    if (data) setOrderDetailData(data);
  };

  return { setOrderDetailData, setOrderDetailByRedirect };
};

export default useOpenOrderDetail;
