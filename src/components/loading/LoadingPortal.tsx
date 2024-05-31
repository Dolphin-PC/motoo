"use client";
import "client-only";

import React, { ReactNode } from "react";
import Loading from "./Loading";
import ReactDOM from "react-dom";
import { useRecoilValue } from "recoil";
import { loadingInfoState } from "./atom";

const LoadingPortal = ({ id }: { id: string }) => {
  const loadingInfo = useRecoilValue(loadingInfoState(id));

  const Wrapper = (): ReactNode => {
    return (
      <div className="fixed top-0 left-0 w-full h-screen z-50 ">
        <div className="w-full h-full bg-gray-200 opacity-70" />
        <div className="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Loading message={loadingInfo.message} />
        </div>
      </div>
    );
  };
  return (
    <div>
      {loadingInfo.loading &&
        ReactDOM.createPortal(
          <Wrapper />,
          document.getElementById(id) as HTMLElement
        )}
    </div>
  );
};

export default LoadingPortal;
