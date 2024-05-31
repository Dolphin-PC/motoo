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
    <Button {...props}>
      <Link href={href}>
        <div className="flex items-center justify-between">
          {props.children}
          <div className="flex flex-row gap-3">
            {warning && <Warning />}
            <RightChevron />
          </div>
        </div>
      </Link>
    </Button>
  );
};

export default LinkButton;
