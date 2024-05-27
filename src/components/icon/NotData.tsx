import React from "react";
import LogoSvg from "@assets/icons/main_icon.svg";

type TProps = {
  description?: string;
  children?: React.ReactNode;
};
const NotData = (props: TProps) => {
  return (
    <div className="text-primary-500 flex flex-col justify-center items-center m-10">
      <LogoSvg className="w-16 h-16 transfrom rotate-45" />
      {props.description ? (
        <>
          <h5>{props.description}</h5>
          {props.children}
        </>
      ) : (
        <>
          <h5>데이터가 없습니다.</h5>
          {props.children}
        </>
      )}
    </div>
  );
};

export default NotData;
