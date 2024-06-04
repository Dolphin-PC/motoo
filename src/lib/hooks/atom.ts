import { atomFamily } from "recoil";
import { SOCKET_MESSAGE_TYPE } from "./useWebSocket";

export const socketMessageState = atomFamily<
  string | null,
  SOCKET_MESSAGE_TYPE
>({
  key: "socketMessageState",
  default: null,
});

type THeaderMsg = {
  header: {
    tr_id: SOCKET_MESSAGE_TYPE;
    tr_key: string;
    encrypt: "Y" | "N";
  };
  body: {
    rt_cd: string;
    msg_cd: "OPSP0000" | "OPSP0001" | "OPSP0002";
    msg1: string;
    output: {
      iv: string;
      key: string;
    };
  };
};

export const socketHeaderState = atomFamily<
  THeaderMsg | null,
  SOCKET_MESSAGE_TYPE
>({
  key: "socketHeaderState",
  default: null,
});
