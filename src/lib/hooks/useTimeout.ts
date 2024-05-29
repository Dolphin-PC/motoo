"use client";
import React, { useEffect, useRef, useState } from "react";

export default function useTimeout(ms: number) {
  const [isTimeout, setIsTimeout] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>();

  function startTimer() {
    console.info("Timer started");
    timer.current = setTimeout(() => {
      console.info("Timer ended");
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
