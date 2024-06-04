"use client";

import { useEffect, useRef, useState } from "react";
import { isJson } from "../util/util";
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from "recoil";
import { socketHeaderState, socketMessageState } from "./atom";

const URL = process.env.NEXT_PUBLIC_VTS_SOCKET_URL;

const MAX_RETRY_COUNT = 5;
const MIN_INTERVAL = 1000;
const MAX_JITTER = 200;

const NORMAL_CODE = 1006;
const CLOSE_CODE = 1000;
const ERROR_CODE = 9999;

export enum SOCKET_STATUS {
  NONE = -1,
  CONNECTING = 0,
  OPEN = 1,
  CLOSING = 2,
  CLOSED = 3,
}

//! 새로운 웹소켓 연동하기전, 타입등록 필요!!, 소켓에서 수신되는 메시지를 해당 atomFamily[TYPE]에 담아줌
const MESSAGE_TYPE = ["H0STASP0", "H0STCNT0", "H0STCNI9"] as const;
export type SOCKET_MESSAGE_TYPE = (typeof MESSAGE_TYPE)[number];

/** @desc 웹소켓을 사용하기 위한 커스텀 훅(RecoilRoot Wrap 필수) */
export default function useWebSocket(msgType: SOCKET_MESSAGE_TYPE) {
  //XXX 소켓의 상태를 state로 관리해야, 상태에 따른 UI처리(useEffect)가 가능함
  const [socketStatus, setSocketStatus] = useState<SOCKET_STATUS>(-1);

  // 소켓 다중 수신 메시지 타입별 처리를 위한 객체 생성
  const setMessageObjRef = useRef<{
    [key: string]: SetterOrUpdater<string | null>;
  }>(
    MESSAGE_TYPE.reduce((obj, trId) => {
      return {
        ...obj,
        [trId]: useSetRecoilState(socketMessageState(trId)),
      };
    }, {})
  );
  const message = useRecoilValue(socketMessageState(msgType));

  const setHeaderObjRef = useRef<{
    [key: string]: SetterOrUpdater<string | null>;
  }>(
    MESSAGE_TYPE.reduce((obj, trId) => {
      return {
        ...obj,
        [trId]: useSetRecoilState(socketHeaderState(trId)),
      };
    }, {})
  );
  const header = useRecoilValue(socketHeaderState(msgType));

  useEffect(() => {
    // 소켓 초기화
    if (window.socketInfo == null) {
      window.socketInfo = {
        webSocket: new WebSocket(URL),
        isSetUp: false,
        retryCount: 0,
      };
      setSocketStatus(SOCKET_STATUS.CONNECTING);
    }

    if (window.socketInfo.isSetUp == false) {
      setUpWebSocket();

      window.socketInfo.isSetUp = true;
      console.info("WebSocket Setup Success");
    }

    // 멀티 웹소켓 연결을 위함 //
    if (window.socketInfo.webSocket.readyState == WebSocket.OPEN) {
      setSocketStatus(SOCKET_STATUS.OPEN);
    }

    // 연결중일때, 2번째 이후의 웹소켓연결은 0.01초 후에 소켓의 상태를 확인하여 OPEN으로 변경
    if (window.socketInfo.webSocket.readyState == WebSocket.CONNECTING) {
      const retry = setInterval(() => {
        if (
          window.socketInfo &&
          window.socketInfo.webSocket.readyState == WebSocket.OPEN
        ) {
          setSocketStatus(SOCKET_STATUS.OPEN);
          clearInterval(retry);
        }
      }, 10);
    }
    // 멀티 웹소켓 연결을 위함 //
    return () => {
      // XXX 웹소켓 연결 해제 대신, 활용하는 쪽에서 실시간연결 해제하는 것으로 대체
      // XXX 메시지 수신이 없을 경우, 일정시간(1-2분?) 이후 자동으로 끊김
      // if (window.socketInfo && window.socketInfo.webSocket.OPEN) {
      //   window.socketInfo.webSocket.close(CLOSE_CODE);
      //   setSocketStatus(SOCKET_STATUS.CLOSING);
      //   console.info("WebSocket Close by unmount");
      // }
    };
  }, []);

  const setUpWebSocket = () => {
    if (window.socketInfo == null) throw new Error("window.socketInfo is null");

    const { webSocket } = window.socketInfo;

    webSocket.onopen = () => {
      setSocketStatus(SOCKET_STATUS.OPEN);
      console.info("WebSocket Opened");
    };

    webSocket.onmessage = (event) => {
      // console.info("MESSAGE ::", event.data);
      // XXX : 첫응답의 데이터와 이후 데이터가 type이 같고, data만 다름... (구분할 방법이 없음, json인지 확인하는 수 밖에)
      if (isJson(event.data)) {
        const data = JSON.parse(event.data);

        // 연결 성공
        if (data.body && data.body.msg_cd == "OPSP0000") {
          if (data.header.tr_id && data.body.msg1) {
            console.info("연결 성공 ::", data.header.tr_id, data.body.msg1);

            setHeaderObjRef.current[data.header.tr_id](data);
          }
        }
        // 연결해제 성공
        if (data.body && data.body.msg_cd == "OPSP0001") {
          if (data.header.tr_id && data.body.msg1) {
            console.info("연결해제 성공 ::", data.header.tr_id, data.body.msg1);
          }
        }
      } else {
        // console.info("MESSAGE ::", event.data);
        const msgTrId: SOCKET_MESSAGE_TYPE = event.data.slice(2, 10);
        const set = setMessageObjRef.current[msgTrId];
        set(event.data);
      }
    };

    webSocket.onerror = (event) => {
      // 에러 발생시, 에러코드로 웹소켓 종료
      if (window.socketInfo!.isSetUp == true) {
        webSocket.close(ERROR_CODE);
      }
    };

    webSocket.onclose = (event) => {
      if (window.socketInfo!.isSetUp) {
        // 재연결 시도 (Backoff알고리즘 + Jitter)
        if (event.code != NORMAL_CODE && event.code != CLOSE_CODE) {
          // Backoff알고리즘
          let interval =
            MIN_INTERVAL * Math.pow(2, window.socketInfo!.retryCount);

          // Jitter
          const jitter =
            Math.floor(Math.random() * (MAX_JITTER * 2 + 1)) - MAX_JITTER;
          interval += jitter;

          if (window.socketInfo!.retryCount < MAX_RETRY_COUNT) {
            setTimeout(() => {
              window.socketInfo!.webSocket = new WebSocket(URL);
              setUpWebSocket();
              window.socketInfo!.retryCount++;
            }, interval);
          }
        } else {
          // 닫힌 websocket은 다시 열수 없으므로, 객체를 아예 삭제처리
          window.socketInfo = null;
        }
      }
      setSocketStatus(SOCKET_STATUS.CLOSED);
      console.info("WebSocket Closed", event.code);
    };
  };

  const sendMessage = <T>(message: T) => {
    if (window.socketInfo && window.socketInfo.webSocket.OPEN) {
      window.socketInfo.webSocket.send(JSON.stringify(message));
    } else {
      console.error("WebSocket is not connected");
    }
  };

  return {
    message,
    sendMessage,
    socketStatus,
    header,
  };
}
