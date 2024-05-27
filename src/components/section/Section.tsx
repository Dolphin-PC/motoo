import React, { ButtonHTMLAttributes, ReactNode } from "react";
import SectionCard from "./SectionCard";
import SectionScroll from "./SectionScroll";
import dynamic from "next/dynamic";
import NotData from "../icon/NotData";

export type TSectionProps = {
  title?: string;
  titleProps?: ButtonHTMLAttributes<HTMLDivElement>;
  children: ReactNode;
  className?: HTMLDivElement["className"];
  right?: React.ReactNode;
  notData?: boolean;
};

const Section = (props: TSectionProps): React.ReactNode => {
  return (
    <div className="flex flex-col h-full neumorphism">
      <div
        className="flex flex-row justify-between items-center"
        {...props.titleProps}
      >
        {props.title && (
          <h5 className={"font-bold text-primary-550"}>| {props.title}</h5>
        )}
        {props.right && props.right}
      </div>
      <div className={`${props.className || ""}`}>
        {props.notData === true ? <NotData /> : props.children}
      </div>
    </div>
  );
};

const SectionSkeleton = () => {
  return (
    <div className="animate-pulse">
      <Section>Loading...</Section>
    </div>
  );
};

// SSR
Section.Skeleton = SectionSkeleton;
Section.Card = SectionCard;
Section.Scroll = SectionScroll;

// CSR
Section.Accordion = dynamic(() => import("./SectionAccordion"), {
  ssr: false,
  loading: () => <div>loading...</div>,
});

export default Section;
