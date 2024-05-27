import { atom, atomFamily } from "recoil";

export const bottomSheetOpenState = atomFamily<boolean, string>({
  key: "bottomSheetOpenState",
  default: () => false,
});
