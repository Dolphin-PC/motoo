"use client";

import { MouseEvent, useEffect, useRef, useState } from "react";

/** @desc TabHeader 클릭시, registryRef로 등록된 요소로 스크롤 */
export const useTabScroll = () => {
  const tabBodyRef = useRef<HTMLDivElement[]>([]);

  const headerRef = useRef<HTMLDivElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.getBoundingClientRect().bottom + 20);
    }
  }, []);

  // ref 등록
  const registryRef = (e: HTMLDivElement | null) => {
    if (e === null) return;

    if (e.tabIndex > -1) {
      e.style.scrollMarginTop = headerHeight + "px"; // 스크롤 시 headerHeight 만큼 marginTop 적용

      tabBodyRef.current[e.tabIndex] = e; // tabBodyRef에 등록
    } else {
      throw new Error("tabIndex가 없습니다.");
    }
  };

  // 버튼 클릭시, ref에 등록된 element로 스크롤 이동 & open 상태 변경
  const handleScroll = (e: MouseEvent<HTMLButtonElement>) => {
    if (tabBodyRef.current) {
      const tabIndex = e.currentTarget.tabIndex;
      const tab = tabBodyRef.current[tabIndex];

      tab.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    }
  };

  return {
    registryRef,
    handleScroll,
    headerRef,
  };
};
