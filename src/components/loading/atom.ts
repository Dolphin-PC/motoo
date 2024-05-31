import { atom, atomFamily, selector } from "recoil";

export const loadingInfoState = atomFamily({
  key: "loadingInfoState",
  default: {
    loading: false,
    id: "",
    message: "",
  },
});
