"use client";
import Button from "@/components/buttons/Button";
import Section from "@/components/section/Section";
import React, { MouseEvent, useEffect, useRef, useState } from "react";

const LikeStockPage = () => {
  const tabBodyRef = useRef<any[]>([]);

  const headerRef = useRef<HTMLDivElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight + 50);
    }
  }, []);

  const registryRef = (e: HTMLDivElement | null) => {
    if (e === null) return;
    e.style.scrollMarginTop = headerHeight + "px";
    tabBodyRef.current.push(e);
  };
  const handleScroll = (e: MouseEvent<HTMLButtonElement>) => {
    const tabIndex = e.currentTarget.tabIndex;
    if (tabBodyRef.current) {
      (tabBodyRef.current[tabIndex] as HTMLDivElement).scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="sticky top-0" ref={headerRef}>
        <Section.Scroll title="관심주식">
          <Button tabIndex={0} onClick={handleScroll}>
            그룹 1
          </Button>
          <Button tabIndex={1} onClick={handleScroll}>
            그룹 1
          </Button>
          <Button tabIndex={2} onClick={handleScroll}>
            그룹 1
          </Button>
          <Button tabIndex={3} onClick={handleScroll}>
            그룹 1
          </Button>
        </Section.Scroll>
      </div>
      <div className="h-screen" id="0" ref={registryRef}>
        여기가 보여야 돼요!
      </div>
      <div className="h-screen" id="1" ref={registryRef}>
        여기가 보여야 돼요!
      </div>
      <div className="h-screen" id="2" ref={registryRef}>
        여기가 보여야 돼요!
      </div>
      <div className="h-screen" id="3" ref={registryRef}>
        여기가 보여야 돼요!
      </div>
    </div>
  );
};

export default LikeStockPage;
