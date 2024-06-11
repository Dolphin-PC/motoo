"use client";
import { Drawer } from "@mui/material";
import React, { ReactNode, useState } from "react";
import { useRecoilState } from "recoil";
import { bottomSheetOpenState } from "./atom";
import LeftChevron from "@/assets/icons/chevron-left.svg";
import Button from "../buttons/Button";

type TProps = {
  children: React.ReactNode;
  title?: ReactNode;
  openStateKey: string;
};

const BottomSheet = (props: TProps) => {
  const [isOpen, setIsOpen] = useRecoilState(
    bottomSheetOpenState(props.openStateKey)
  );

  const toggleSheet = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="z-50">
      <Drawer
        variant="persistent"
        anchor={"bottom"}
        open={isOpen}
        onClose={toggleSheet}
      >
        <div className="flex flex-col h-screen p-5 gap-5">
          <div className="sticky top-5 flex items-center">
            <Button.Action onClick={toggleSheet}>
              <div className="flex items-center gap-3">
                <LeftChevron />
                {props.title && props.title}
              </div>
            </Button.Action>
          </div>
          {props.children}
        </div>
      </Drawer>
    </div>
  );
};

export default BottomSheet;
