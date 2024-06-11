import { atom } from "recoil";
import { TConclusionData } from "../inquireDailyConclusion";

export const orderDetailState = atom<TConclusionData | null>({
  key: "orderDetailState",
  default: null,
});
