"use client";
import React, { useEffect, useState } from "react";
import Loading from "./loading";
import { useSetRecoilState } from "recoil";
import { loadingInfoState } from "@/components/loading/atom";

const ID = "main" as const;

export default function Init() {
  const setLoadingInfo = useSetRecoilState(loadingInfoState(ID));

  useEffect(() => {
    setLoadingInfo({
      loading: true,
      id: ID,
      message: "주식정보를 동기화중입니다.",
    });
    // TODO 주식잔고조회 API호출해서, 주식잔고 조회 후, 유저정보에 주식잔고정보 추가
  }, []);

  return <Loading.Portal id={ID} />;
}
