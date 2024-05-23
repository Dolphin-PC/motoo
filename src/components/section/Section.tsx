import React, { ReactNode } from "react";
import SectionCard from "./SectionCard";
import SectionScroll from "./SectionScroll";
import dynamic from "next/dynamic";

export type TSectionProps = {
  title?: string;
  children: ReactNode;
  className?: HTMLDivElement["className"];
  right?: React.ReactNode;
};

const Section = (props: TSectionProps): React.ReactNode => {
  return (
    <div className="flex flex-col gap-3 h-full neumorphism">
      <div className="flex flex-row justify-between items-center">
        {props.title && (
          <h5 className="font-bold text-primary-550">| {props.title}</h5>
        )}
        {props.right && props.right}
      </div>
      <div className={`${props.className || ""}`}>{props.children}</div>
    </div>
  );
};

// SSR
Section.Card = SectionCard;
Section.Scroll = SectionScroll;
// CSR
Section.Accordion = dynamic(() => import("./SectionAccordion"), {
  ssr: false,
  loading: () => <div>loading...</div>,
});

export default Section;
