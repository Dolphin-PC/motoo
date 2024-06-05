import React from "react";
import Section from "./Section";
import Link from "next/link";
import RightChevron from "../icon/RightChevron";

type TProps = {
  title: string;
  href: string;
};
const SectionLink = (props: TProps) => {
  return (
    <Link href={props.href}>
      <Section title={props.title} right={<RightChevron />} />
    </Link>
  );
};

export default SectionLink;
