"use client";

import Button from "@/components/buttons/Button";
import NotData from "@/components/icon/NotData";
import React, { useEffect } from "react";

const error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    // Log the error to an error reporting service (ex. Sentry)
    console.error(error);
  }, [error]);

  return (
    <div>
      <NotData description="오류가 발생했어요." />
      <Button primary onClick={reset}>
        다시 시도
      </Button>
    </div>
  );
};

export default error;
