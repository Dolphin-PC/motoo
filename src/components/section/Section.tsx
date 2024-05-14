import React from "react";
import SectionCard from "./SectionCard";

export type TSectionProps = {
  title: string;
  children: React.ReactNode;
  className?: HTMLDivElement["className"];
  right?: React.ReactNode;
};
const Section = (props: TSectionProps): React.ReactNode => {
  return (
    <div className="flex flex-col gap-3 neumorphism">
      <div className="flex justify-between items-center">
        <h5 className="font-bold text-primary-550">| {props.title}</h5>
        {props.right && props.right}
      </div>
      <div className={`${props.className}`}>{props.children}</div>
    </div>
  );
};

const SectionScrollable = (props: TSectionProps): React.ReactNode => {
  return (
    <Section
      {...props}
      className={`flex flex-row gap-5 overflow-x-auto whitespace-nowrap hide-scrollbar ${props.className}`}
    />
  );
  //   return (
  //     <div className="flex flex-col gap-3">
  //       <h5 className="font-bold text-primary-550">| {props.title}</h5>
  //       <div

  //       >
  //         {props.children}
  //       </div>
  //     </div>
  //   );
};

Section.Card = SectionCard;
Section.Scroll = SectionScrollable;

export default Section;
