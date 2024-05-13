import React from "react";
import Button, { TButtonProps } from "./Button";
import Link from "next/link";
import RightChevron from "@/assets/icons/chevron-right.svg";
import Warning from "@/assets/icons/warning.svg";

type TProps = TButtonProps & {
  href: string;
  warning?: boolean;
};

const LinkButton = ({ href, warning, ...props }: TProps): React.ReactNode => {
  return (
    <Link href={href}>
      <Button {...props}>
        <div className="flex items-center justify-between">
          {props.children}
          <div className="flex">
            {warning && <Warning />}
            <RightChevron />
          </div>
        </div>
      </Button>
    </Link>
  );
};

export default LinkButton;
