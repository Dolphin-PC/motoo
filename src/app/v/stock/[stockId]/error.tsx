"use client";

import Button from "@/components/buttons/Button";
import NotData from "@/components/icon/NotData";
import React, { useEffect } from "react";

// let SOCKET_HTTPS_MSG =
//   "Failed to construct 'WebSocket': An insecure WebSocket connection may not be initiated from a page loaded over HTTPS. ";

const error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  const baseUrl = window.location.origin;
  const settingUrl = "chrome://settings/content/siteDetails";
  const URL = settingUrl + "?site=" + baseUrl;

  useEffect(() => {
    // Log the error to an error reporting service (ex. Sentry)
  }, [error]);

  return (
    <div className="p-5 flex flex-col gap-5">
      <NotData description="오류가 발생했어요." />
      <div>
        <h5>
          이 오류 메시지가 보이셨다면, 불편하시겠지만 인터넷 옵션의 설정을
          변경해주세요.
        </h5>
        <h5>(개인정보보호 및 보안 &gt; 안전하지 않은 콘텐츠 &gt; 허용)</h5>
        <small>{URL}</small>
      </div>

      <Button primary onClick={reset}>
        다시 시도
      </Button>
    </div>
  );
};

export default error;
