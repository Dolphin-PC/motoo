"use client";
import React, { MouseEvent, ReactNode } from "react";
import Section, { TSectionProps } from "./Section";
import DownChevron from "@/assets/icons/chevron-down.svg";
import clsx from "clsx";
import { useRecoilState } from "recoil";
import { tabOpenStateList } from "@/app/v/like-stock/atom";

type TSectionAccordionProps = {
  index: number;
  noContent: ReactNode;
} & TSectionProps;

const SectionAccordion = (props: TSectionAccordionProps) => {
  const { index, children, noContent = "내용이 없어요." } = props;

  const [isOpen, setIsOpen] = useRecoilState(tabOpenStateList(index));

  const toggleAccordion = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <Section
      title={props.title}
      titleProps={{ onClick: toggleAccordion }}
      right={
        <div
          className={clsx(
            "transition-transform duration-500 ease-in-out cursor-pointer",
            {
              "transform rotate-180": isOpen,
            }
          )}
        >
          <DownChevron />
        </div>
      }
    >
      <div
        className={clsx("overflow-hidden", {
          "h-0": !isOpen,
        })}
      >
        {children || noContent}
      </div>
    </Section>
  );
};
export default SectionAccordion;
