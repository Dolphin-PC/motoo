import { atomFamily } from "recoil";

export const tabOpenStateList = atomFamily<boolean, number>({
  key: "openList",
  default: () => false,
});
