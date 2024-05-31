import NotData from "@/components/icon/NotData";
import React from "react";
import dynamic from "next/dynamic";

const Loading = ({ message }: { message?: string }) => {
  return <NotData description={message ?? "LOADING..."} />;
};

Loading.Portal = dynamic(() => import("./LoadingPortal"));

export default Loading;
