import { atom } from "recoil";

export const snackBarState = atom({
  key: "snackBarState",
  default: {
    open: false,
    message: "",
    link: "",
  },
});
