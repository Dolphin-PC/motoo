import { TConclusionData } from "../inquireDailyConclusion";
import { useSetRecoilState } from "recoil";
import { orderDetailState } from "../OrderDetail/atom";
import { bottomSheetOpenState } from "@/components/bottomSheet/atom";

const useOpenOrderDetail = () => {
  const setConclusion = useSetRecoilState(orderDetailState);
  const setIsOpen = useSetRecoilState(bottomSheetOpenState("orderDetail"));

  const handleClickConclusion = (data: TConclusionData): void => {
    setConclusion(data);
    setIsOpen(true);
  };

  return { handleClickConclusion };
};

export default useOpenOrderDetail;
