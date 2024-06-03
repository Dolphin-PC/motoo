import React from "react";
import Section, { TSectionProps } from "./Section";

const SectionScroll = (props: TSectionProps): React.ReactNode => {
  return (
    <Section
      {...props}
      childrenProps={{
        className: `flex flex-row gap-5 overflow-auto whitespace-nowrap hide-scrollbar`,
      }}
    />
  );
};

export default SectionScroll;
