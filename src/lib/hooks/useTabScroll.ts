"use client";

import { MouseEvent, useEffect, useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { tabOpenState, tabOpenStateList } from "../atoms/tab";

export const useTabScroll = ({ length }: { length: number }) => {
  const tabBodyRef = useRef<HTMLDivElement[]>([]);

  const headerRef = useRef<HTMLDivElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  // const [isOpenTabList, setIsOpenTabList] = useRecoilState(tabOpenStateList);
  const setIsOpenTabList = useSetRecoilState(tabOpenStateList);
  const setOpenList = Array(length)
    .fill(false)
    .map((_, idx) => useSetRecoilState(tabOpenState(idx)));

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight + 50);
    }

    setIsOpenTabList(new Array(length).fill(false));
  }, []);

  // ref 등록
  const registryRef = (e: HTMLDivElement | null) => {
    if (e === null) return;

    if (e.tabIndex > -1) {
      e.style.scrollMarginTop = headerHeight + "px"; // 스크롤 시 headerHeight 만큼 marginTop 적용
      tabBodyRef.current[e.tabIndex] = e; // tabBodyRef에 등록
    }
  };

  // 버튼 클릭시, ref에 등록된 element로 스크롤 이동
  const handleScroll = (e: MouseEvent<HTMLButtonElement>) => {
    const tabIndex = e.currentTarget.tabIndex;
    if (tabBodyRef.current) {
      (tabBodyRef.current[tabIndex] as HTMLDivElement).scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
      // setIsOpenTabList(() => {
      //   const newState = [...isOpenTabList];
      //   newState[tabIndex] = true;
      //   return newState;
      // });
      setOpenList[tabIndex](true);
    }
  };

  return {
    registryRef,
    handleScroll,
    headerRef,
    // isOpenTabList,
    setIsOpenTabList,
  };
};
