import React, { ReactNode } from "react";
import TooltipComponent from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import { purple } from "tailwindcss/colors";

type TProps = {
  /** @desc 설명 글 */
  title: string;
  children?: ReactNode;
};
const Tooltip = (props: TProps) => {
  return (
    <TooltipComponent title={props.title}>
      <div className="flex items-center">
        <InfoIcon fontSize="small" sx={{ color: purple[500] }} />
        {props.children}
      </div>
    </TooltipComponent>
  );
};

export default Tooltip;
