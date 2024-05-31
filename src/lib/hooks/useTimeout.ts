"use client";
import React, { useEffect, useRef, useState } from "react";

export default function useTimeout(ms: number) {
  const [isTimeout, setIsTimeout] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>();

  function startTimer() {
    timer.current = setTimeout(() => {
      setIsTimeout(true);
    }, ms);
  }

  function stopTimer() {
    if (timer.current) {
      clearTimeout(timer.current);
    }
  }

  useEffect(() => {
    return () => stopTimer();
  }, []);

  return { isTimeout, startTimer, stopTimer };
}
