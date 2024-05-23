"use client";
import React, { ReactNode } from "react";
import Section, { TSectionProps } from "./Section";
import DownChevron from "@/assets/icons/chevron-down.svg";
import Button from "../buttons/Button";
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

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Section
      title={props.title}
      right={
        <Button onClick={toggleAccordion}>
          <div
            className={clsx("transition-transform duration-500 ease-in-out", {
              "transform rotate-180": isOpen,
            })}
          >
            <DownChevron />
          </div>
        </Button>
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
