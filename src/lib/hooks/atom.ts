import { atomFamily } from "recoil";

export const socketMessageState = atomFamily<string | null, string>({
  key: "socketMessageState",
  default: null,
});
