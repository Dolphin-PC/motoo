"use client";
import React, { useEffect, useState } from "react";
import Loading from "./loading";
import { useSetRecoilState } from "recoil";
import { loadingInfoState, loadingState } from "@/components/loading/atom";
import { fetchHelperWithData } from "@/lib/api/helper";
import { getSessionStorageItem, setSessionStorageItem } from "@/lib/util/util";

const ID = "main";
export const SYNC_ID = "SYNC_AMOUNT_INFO";

export default function Init() {
  const setLoadingInfo = useSetRecoilState(loadingInfoState(ID));
  const setLoading = useSetRecoilState(loadingState(ID));

  const syncAmountInfo = async () => {
    await fetchHelperWithData<null, any>({
      method: "POST",
      url: "/api/account/sync",
    }).then((res) => {
      setSessionStorageItem(SYNC_ID, true);
      setLoading(false);

      window.location.reload();

      console.log(res.message);
    });
  };

  useEffect(() => {
    const isSync = getSessionStorageItem(SYNC_ID);

    if (isSync != true) {
      setLoadingInfo({
        loading: true,
        id: ID,
        message: "주식정보를 동기화중입니다.",
      });
      syncAmountInfo();
    }
  }, []);

  return <Loading.Portal id={ID} />;
}
