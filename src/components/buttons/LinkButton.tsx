import React from "react";
import Button, { TButtonProps } from "./Button";
import Link from "next/link";
import RightChevron from "@/assets/icons/chevron-right.svg";
import Warning from "@/assets/icons/warning.svg";

type TProps = TButtonProps & {
  href: string;
  warning?: boolean | (() => boolean);
};

const LinkButton = (props: TProps): React.ReactNode => {
  return (
    <Link href={props.href}>
      <div className="flex items-center rounded-md pr-2 ">
        <Button className="text-left">{props.children}</Button>
        {props.warning && <Warning />}
        <RightChevron />
      </div>
    </Link>
  );
};

export default LinkButton;
