"use client";

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

  return <div>Root Error</div>;
};

export default error;
