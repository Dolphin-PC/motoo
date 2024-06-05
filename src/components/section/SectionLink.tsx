import React from "react";
import Section from "./Section";
import Button from "../buttons/Button";

type TProps = {
  title: string;
  href: string;
};
const SectionLink = (props: TProps) => {
  return (
    <Section title={props.title} right={<Button.Link href={props.href} />}>
      <></>
    </Section>
  );
};

export default SectionLink;
