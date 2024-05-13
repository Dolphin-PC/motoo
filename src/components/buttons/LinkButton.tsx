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
      <Button {...props}>
        <div className="flex items-center justify-between">
          {props.children}
          <div className="flex">
            {props.warning && <Warning />}
            <RightChevron />
          </div>
        </div>
      </Button>
    </Link>
  );
};

export default LinkButton;
