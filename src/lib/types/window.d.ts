declare global {
  interface Window {
    socketInfo: {
      webSocket: WebSocket;
      isSetUp: boolean;
      retryCount: number;
    } | null;
  }
}

// 파일을 모듈로 만들어줌으로서 전역변수 선언(?)
export {};
