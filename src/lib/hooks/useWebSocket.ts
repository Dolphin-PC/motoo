"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { isJson } from "../util/util";
import { StockInfo } from "@/pages/model/StockInfo";
import { AccountInfo } from "@/pages/model/AccountInfo";

const URL = process.env.NEXT_PUBLIC_VTS_SOCKET_URL;

const MAX_RETRY_COUNT = 5;
const MIN_INTERVAL = 1000;
const MAX_JITTER = 200;

const NORMAL_CODE = 1000;
const ERROR_CODE = 9999;

const isWebSocketOpen = (ws: WebSocket) => ws && ws.readyState === ws.OPEN;

export default function useWebSocket({
  stockId,
  approvalKey,
}: {
  stockId: StockInfo["stockId"];
  approvalKey: AccountInfo["approvalKey"] | null | undefined;
}) {
  //   const apiKey = useRef(approvalKey);

  const webSocket = useRef<WebSocket | null>(null);
  const [message, setMessage] = useState();

  // 연결 실패시 재시도를 위한 변수
  const isMounted = useRef(true);
  const retryCount = useRef(0);

  const isAbleToConnect = approvalKey && stockId;

  const setUpWebSocket = useCallback(
    (ws: WebSocket) => {
      ws.onopen = () => {
        console.info("WebSocket Opened");
        retryCount.current = 0;
        webSocket.current?.send(
          JSON.stringify({
            header: {
              approval_key: approvalKey, // 웹소켓 발급키
              custtype: "P",
              tr_type: "1",
              "content-type": "utf-8",
            },
            body: {
              input: {
                tr_id: "H0STASP0", // 모의투자 전용
                tr_key: stockId, // 종목번호
              },
            },
          })
        );
      };

      ws.onmessage = (event) => {
        // XXX : 첫응답의 데이터와 이후 데이터가 type이 같고, data만 다름... (구분할 방법이 없음, json인지 확인하는 수 밖에)
        if (isJson(event.data)) {
          console.log("HEADER ::", JSON.parse(event.data));
        } else {
          setMessage(event.data);
        }
      };

      ws.onerror = (event) => {
        // 에러 발생시, 에러코드로 웹소켓 종료
        if (isMounted.current == true) {
          ws.close(ERROR_CODE);
        }
      };

      ws.onclose = (event) => {
        if (isMounted.current == true) {
          console.info("WebSocket Closed");

          // 재연결 시도 (Backoff알고리즘 + Jitter)
          if (event.code != NORMAL_CODE) {
            // Backoff알고리즘
            let interval = MIN_INTERVAL * Math.pow(2, retryCount.current);

            // Jitter
            const jitter =
              Math.floor(Math.random() * (MAX_JITTER * 2 + 1)) - MAX_JITTER;
            interval += jitter;

            if (retryCount.current < MAX_RETRY_COUNT) {
              setTimeout(() => {
                webSocket.current = new WebSocket(URL);
                setUpWebSocket(webSocket.current);
                retryCount.current++;
              }, interval);
            }
          }
        }
      };
    },
    [stockId, approvalKey]
  );

  useEffect(() => {
    // 재연결을 위한 초기화
    retryCount.current = 0;
    isMounted.current = true;
  }, []);

  useEffect(() => {
    if (isAbleToConnect) {
      webSocket.current = new WebSocket(URL);
      setUpWebSocket(webSocket.current);
    }

    return () => {
      if (webSocket.current && isWebSocketOpen(webSocket.current)) {
        isMounted.current = false;
        webSocket.current.close(NORMAL_CODE);
        console.info("WebSocket Close");
      }
    };
  }, [stockId, approvalKey]);

  return message;
}
